import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { buildRequest, normalizeDecision, selectCapability } from "../integrations/relevance-ai/runtime.mjs";

const root = new URL("../integrations/relevance-ai/", import.meta.url);
const fixture = async (name) => JSON.parse(await readFile(new URL(`fixtures/${name}.json`, root), "utf8"));

test("public manifest is sanitized and forbids automatic payment", async () => {
  const raw = await readFile(new URL("authoring-manifest.json", root), "utf8");
  const manifest = JSON.parse(raw);
  assert.equal(manifest.state, "PUBLIC_DOCUMENTATION_EXPORT_NOT_MARKETPLACE_SUBMITTED");
  assert.equal(manifest.payment_policy.automatic_payment, false);
  assert.deepEqual(manifest.secrets, []);
  assert.doesNotMatch(raw, /app\.relevanceai\.com\/(agents|notebook)/);
});

test("private five-solution portfolio stays descriptive, private, and approval-gated", async () => {
  const raw = await readFile(new URL("authoring-manifest.json", root), "utf8");
  const portfolio = JSON.parse(raw).private_portfolio;
  assert.equal(portfolio.state, "PRIVATE_RELEVANCE_AI_PROJECT_ONLY");
  assert.equal(portfolio.tool_count, 5);
  assert.equal(portfolio.tools.length, 5);
  assert.equal(new Set(portfolio.tools.map((tool) => tool.name)).size, 5);
  assert.equal(portfolio.requires_approval, true);
  assert.equal(portfolio.publicly_available, false);
  assert.equal(portfolio.automatic_payment, false);
  assert.equal(portfolio.marketplace_submitted, false);
  assert.equal(portfolio.production_calls_during_configuration, 0);
  assert.equal(portfolio.purchases_during_configuration, 0);
  assert.equal(portfolio.tools.find((tool) => tool.product_id === "gb.solution.payment_authorization.v1").payment_execution, false);
  assert.doesNotMatch(raw, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
});

test("all seven synthetic fixtures are present", async () => {
  const files = (await readdir(new URL("fixtures/", root))).filter((name) => name.endsWith(".json")).sort();
  assert.deepEqual(files, ["ambiguous-company.json", "company-active.json", "conditioned-capability.json", "idempotency.json", "payment-required.json", "replay.json", "source-unavailable.json"]);
});

test("capability selection stays narrow and conditioned work stops", () => {
  assert.equal(selectCapability({ intent: "company_check" }).capability, "company_check");
  assert.equal(selectCapability({ intent: "bank_account_ownership" }).status, "STOP");
  assert.equal(selectCapability({ intent: "company_check", country: "US" }).status, "STOP");
});

test("request builder validates idempotency and never adds payment material", () => {
  const request = buildRequest({ capability: "company_check", company_number: "01234567", idempotency_key: "public-demo-001" });
  assert.equal(request.method, "POST");
  assert.equal(request.economic_intent, true);
  assert.equal(request.headers["Idempotency-Key"], "public-demo-001");
  assert.doesNotMatch(JSON.stringify(request), /payment-signature|private_key|payer_key/i);
});

test("decision normalization maps evidence states safely", async () => {
  assert.equal(normalizeDecision((await fixture("company-active")).response).recommendation, "PROCEED");
  assert.equal(normalizeDecision((await fixture("ambiguous-company")).response).recommendation, "REVIEW");
  assert.equal(normalizeDecision((await fixture("source-unavailable")).response).recommendation, "REVIEW");
  assert.equal(normalizeDecision((await fixture("replay")).response).replayed, true);
});

test("HTTP 402 is REVIEW and payment material is redacted", async () => {
  const output = normalizeDecision((await fixture("payment-required")).response);
  assert.equal(output.recommendation, "REVIEW");
  assert.equal(output.payment_required, true);
  assert.equal(output.original.payment_signature, "[REDACTED]");
});
