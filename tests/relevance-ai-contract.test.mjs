import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { buildRequest, normalizeDecision, selectCapability } from "../integrations/relevance-ai/runtime.mjs";

const root = new URL("../integrations/relevance-ai/", import.meta.url);
const fixture = async (name) => JSON.parse(await readFile(new URL(`fixtures/${name}.json`, root), "utf8"));

test("public manifest is sanitized and forbids automatic payment", async () => {
  const raw = await readFile(new URL("authoring-manifest.json", root), "utf8");
  const manifest = JSON.parse(raw);
  assert.equal(manifest.state, "MARKETPLACE_REVIEW_PENDING_UNPUBLISHED");
  assert.equal(manifest.payment_policy.automatic_payment, false);
  assert.equal(manifest.payment_policy.wallet_or_payer_secret_in_relevance, false);
  assert.equal(manifest.marketplace.approval_status, "pending");
  assert.equal(manifest.marketplace.published_status, "Unpublished");
  assert.equal(manifest.marketplace.target_submission_count, 5);
  assert.equal(manifest.marketplace.submission_count, 6);
  assert.deepEqual(manifest.secrets, []);
  assert.doesNotMatch(raw, /app\.relevanceai\.com\/(agents|notebook)/);
  assert.doesNotMatch(raw, /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
});

test("five-capability target stays descriptive and approval-gated", async () => {
  const raw = await readFile(new URL("authoring-manifest.json", root), "utf8");
  const manifest = JSON.parse(raw);
  const capabilities = manifest.capabilities;
  assert.equal(capabilities.length, 5);
  assert.equal(new Set(capabilities.map((tool) => tool.name)).size, 5);
  assert.equal(manifest.tool_defaults.relevance_ai_policy, "Approval Required");
  assert.equal(manifest.marketplace.external_installation_certified, false);
  assert.equal(capabilities.find((tool) => tool.product_id_gb === "gb.solution.payment_authorization.v1").payment_execution, false);
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
