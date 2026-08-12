const COMPANY_NUMBER = /^(?:[A-Z]{2}|[0-9]{2})?[0-9]{6}$|^[0-9]{8}$/;
const IDEMPOTENCY_KEY = /^[A-Za-z0-9._:-]{8,120}$/;
const EXECUTION_ID = /^gbexec_[A-Za-z0-9]+$/;

export const RUNONPROOF_ORIGIN = "https://api.runonproof.com";
export const MAX_PAYLOAD_BYTES = 65_536;
export const STOP_DECISIONS = new Set(["REVIEW", "BLOCK", "RETRY", "NO_DECISION"]);

export const CAPABILITIES = Object.freeze({
  company_check: Object.freeze({
    id: "gb.solution.company_check.v1", path: "/v1/gb/solutions/company-check", method: "POST",
    price_usdc: "0.04", availability: "ACTIVE", purchasable: true, intent: "Verify identity and legal company state",
  }),
  supplier_approval: Object.freeze({
    id: "gb.solution.supplier_approval.v1", path: "/v1/gb/solutions/supplier-approval", method: "POST",
    price_usdc: "0.20", availability: "ACTIVE", purchasable: true, intent: "Approve a supplier using company and UK sanctions evidence",
  }),
  restricted_party_screen: Object.freeze({
    id: "restricted_business_party.screen.v1", path: "/v1/restricted-parties/screen", method: "POST",
    price_usdc: null, availability: "ACTIVE", purchasable: false, intent: "Screen a named party against the UK Sanctions List",
  }),
  replay: Object.freeze({
    id: "uk.execution.replay.v1", path: "/v1/gb/executions/{execution_id}", method: "GET",
    price_usdc: "0.00", availability: "ACTIVE", purchasable: false, intent: "Replay one committed execution without source calls or a new charge",
  }),
});

const CONDITIONED = Object.freeze({
  bank_account_ownership: "gb.bank_account_ownership.verify.v1",
  tax_registration: "gb.tax_registration.verify.v1",
  business_licence: "gb.business_licence.verify.v1",
});

export function selectCapability({ intent, country = "GB", has_execution_id = false }) {
  if (country !== "GB") return blocked("COUNTRY_NOT_IN_RELEVANCE_AI_CASE", "Use the canonical BR or US contract; do not reuse GB coverage.");
  if (has_execution_id) return selected("replay");
  if (Object.hasOwn(CONDITIONED, intent)) {
    return blocked("CAPABILITY_CONDITIONED_NON_PURCHASABLE", `${CONDITIONED[intent]} is not purchasable; stop and request qualified external evidence.`);
  }
  if (intent === "supplier_approval") return selected("supplier_approval");
  if (intent === "restricted_party_screen") return selected("restricted_party_screen");
  if (intent === "company_check" || intent === "legal_status" || intent === "resolve_company") return selected("company_check");
  return blocked("INTENT_UNSUPPORTED", "Stop and ask for a narrower verification intent.");
}

export function buildRequest({ capability, company_number, execution_id, idempotency_key, body = {} }) {
  const definition = CAPABILITIES[capability];
  if (!definition) throw new Error("RUNONPROOF_CAPABILITY_UNSUPPORTED");
  if (capability === "replay") {
    if (!EXECUTION_ID.test(String(execution_id ?? ""))) throw new Error("RUNONPROOF_EXECUTION_ID_INVALID");
    return { method: "GET", url: `${RUNONPROOF_ORIGIN}${definition.path.replace("{execution_id}", execution_id)}`, headers: { Accept: "application/json" }, body: null, economic_intent: false };
  }
  if (capability !== "restricted_party_screen" && !COMPANY_NUMBER.test(String(company_number ?? ""))) throw new Error("RUNONPROOF_COMPANY_NUMBER_INVALID");
  if (!IDEMPOTENCY_KEY.test(String(idempotency_key ?? ""))) throw new Error("RUNONPROOF_IDEMPOTENCY_KEY_INVALID");
  const payload = { ...body, ...(company_number ? { company_number } : {}), idempotency_key };
  if (new TextEncoder().encode(JSON.stringify(payload)).byteLength > MAX_PAYLOAD_BYTES) throw new Error("RUNONPROOF_PAYLOAD_TOO_LARGE");
  return {
    method: definition.method, url: `${RUNONPROOF_ORIGIN}${definition.path}`,
    headers: { Accept: "application/json", "Content-Type": "application/json", "Idempotency-Key": idempotency_key },
    body: payload, economic_intent: definition.purchasable,
  };
}

export function normalizeDecision(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return invalid("RESPONSE_NOT_OBJECT");
  if (value.status === "PAYMENT_REQUIRED" || value.http_status === 402) {
    return Object.freeze({ recommendation: "REVIEW", automatic_continuation: false, payment_required: true, reason_codes: ["EXPLICIT_PAYMENT_AUTHORIZATION_REQUIRED"], original: redact(value) });
  }
  const required = ["decision", "authorization", "reason_codes", "coverage", "source_health", "evidence", "limitations", "valid_as_of", "valid_until"];
  const missing = required.filter((key) => value[key] === undefined);
  if (missing.length) return invalid(`MISSING_FIELDS:${missing.join(",")}`);
  const unhealthy = Object.values(value.source_health).some((state) => state !== "HEALTHY");
  const stop = STOP_DECISIONS.has(value.decision) || value.authorization === "HOLD" || value.authorization === "DENY" || unhealthy;
  const recommendation = stop ? (value.authorization === "DENY" || value.decision === "BLOCK" ? "STOP" : "REVIEW") : "PROCEED";
  return Object.freeze({
    recommendation, automatic_continuation: recommendation === "PROCEED", payment_required: false,
    decision: value.decision, authorization: value.authorization, machine_action: value.machine_action,
    reason_codes: [...value.reason_codes], coverage: value.coverage, source_health: value.source_health,
    evidence: value.evidence, limitations: value.limitations, valid_as_of: value.valid_as_of, valid_until: value.valid_until,
    execution_id: value.execution_id ?? null, replayed: value.replayed === true,
    economic_activity: value.economic_activity ?? { charged: false, quote_created: false, settlement_created: false },
  });
}

export function redact(value) {
  const clone = structuredClone(value);
  walk(clone);
  return clone;
}

function walk(value) {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    const businessAuthorization = key === "authorization" && ["ALLOW", "ALLOW_WITH_CONDITIONS", "HOLD", "DENY"].includes(child);
    if (!businessAuthorization && /authorization|api.?key|secret|token|payment.?signature|cookie/i.test(key)) value[key] = "[REDACTED]";
    else walk(child);
  }
}
function selected(key) { return Object.freeze({ status: "SELECTED", capability: key, ...CAPABILITIES[key] }); }
function blocked(reason_code, guidance) { return Object.freeze({ status: "STOP", capability: null, reason_code, guidance }); }
function invalid(reason) { return Object.freeze({ recommendation: "REVIEW", automatic_continuation: false, payment_required: false, reason_codes: [`RUNONPROOF_RESPONSE_INVALID:${reason}`] }); }
