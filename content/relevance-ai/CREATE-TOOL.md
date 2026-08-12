# Create the RunOnProof Tool

The Tool is the part that calls RunOnProof and converts the response into a safe, small result for the agent. `authoring-manifest.json` is a recipe for the editor; it is not a one-click import file.

## 1. Create the blank Tool

In the Relevance AI project:

1. Open **Tools**.
2. Choose **New Tool** → **Start from scratch**.
3. Set the display name to `RunOnProof UK Company Verification`.
4. Use a description that says the Tool verifies a specific UK legal entity, reports scoped evidence, and never pays automatically.

## 2. Add the inputs

Use `schemas/tool-input.schema.json#/$defs/companyCheck` as the contract. The currently observed Tool uses these two required business inputs:

- `company_number`: the Companies House company number to verify;
- `idempotency_key`: a caller-generated key that identifies this exact intent and payload.

Copy names exactly. Do not rename them to friendlier labels in the machine contract. Add human descriptions in the editor instead.

Recommended descriptions:

- `company_number`: “Exact UK Companies House company number. Do not use a company name here.”
- `idempotency_key`: “Unique key for this exact request. Reuse only when the entire payload and intent are identical.”

Do not use personal data, tokens, payment proofs, or secrets as an idempotency key.

## 3. Add the API step

Add an **API** or **API Call** step and configure:

| Field | Value |
| --- | --- |
| Method | `POST` |
| URL | `https://cdo-production.up.railway.app/v1/gb/solutions/company-check` |
| Response format | JSON |
| Throw error on 4xx/5xx | Off |
| Automatic retry | Off |

Add headers:

| Header | Value |
| --- | --- |
| `Accept` | `application/json` |
| `Content-Type` | `application/json` |
| `Idempotency-Key` | dynamic reference to `idempotency_key` |

Build the JSON request body from the schema and the manifest. Bind the same idempotency key into the body if the canonical contract requires it. Do not type a sample key as a permanent literal.

Keeping **Throw error on 4xx/5xx** off is intentional. The normalization step must be able to read and safely classify 402, 409, 422, and 503 responses.

## 4. Add response normalization

Add a JavaScript step after the API step. Use the behavior implemented by `runtime.mjs#normalizeDecision`.

The normalizer must:

- map only a valid allow decision with healthy required sources to `PROCEED`;
- map ambiguity, incomplete evidence, stale/unavailable sources, no-decision, hold, retry, and HTTP 402 to `REVIEW`;
- map denied, blocked, unsupported, or prohibited actions to `STOP` when continuation is unsafe;
- preserve reason codes, evidence references, coverage, freshness, limitations, replay state, and economic activity;
- redact payment material and secrets;
- reject an unexpectedly large or malformed response rather than guessing.

Expose only fields declared in `schemas/decision-output.schema.json`.

## 5. Configure retries and failures

Set the Tool or agent retry count to zero for the paid POST. If the platform has a setting similar to **Always retry errored tool**, leave it off.

A replay GET may retry under a bounded policy. A POST may be repeated only when both the payload and idempotency key are identical. On HTTP 409, stop; do not hide the conflict by inventing a new key.

## 6. Save and publish internally

Save the Tool. If Relevance AI distinguishes Draft from Published, publish it only inside the private project. Internal publication makes a version available to the project; it does not mean public sharing or Marketplace publication.

## 7. Safe first test

Use the fixture documentation, not a real paid POST. Confirm that the `payment-required` case reports:

- product `gb.solution.company_check.v1`;
- price `0.04 USDC`;
- recommendation `REVIEW`;
- explicit approval required;
- no charge and no settlement.

If the Tool tries to pay, retries the POST automatically, or calls production during a fixture-only test, disable it and follow [Rollback and removal](ROLLBACK-AND-REMOVAL.md).
