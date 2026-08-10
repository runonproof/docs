import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeDecision, selectCapability } from "./runtime.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const names = process.argv.slice(2);
const scenarios = names.length ? names : ["company-active", "ambiguous-company", "source-unavailable", "conditioned-capability", "payment-required", "replay", "idempotency"];
const results = [];
for (const scenario of scenarios) {
  const fixture = JSON.parse(await readFile(join(root, "fixtures", `${scenario}.json`), "utf8"));
  if (fixture.selection) results.push({ scenario, input: fixture.input, selection: selectCapability(fixture.input), economic_delta_usdc: "0.00" });
  else if (fixture.response) results.push({ scenario, input: fixture.input, request: fixture.request ?? null, output: normalizeDecision(fixture.response), economic_delta_usdc: "0.00" });
  else results.push({ scenario, ...fixture, economic_delta_usdc: "0.00" });
}
console.log(JSON.stringify({ integration: "RunOnProof integration for Relevance AI", synthetic: true, production_calls: 0, payment_attempts: 0, results }, null, 2));
