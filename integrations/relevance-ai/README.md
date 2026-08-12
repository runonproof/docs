# RunOnProof integration for Relevance AI

This bundle is the canonical executable and documentation source for the RunOnProof Relevance AI product. The five-capability public slice uses Relevance AI Marketplace Tool listings backed by production HTTP APIs. The certified remote MCP may also be connected directly to an Agent through Relevance AI's documented MCP Client. Neither mechanism grants permission to pay automatically.

## What is included

- `authoring-manifest.json`: exact Tool names, HTTP steps, economic state and safety defaults.
- `schemas/`: strict agent inputs and normalized decision output.
- `runtime.mjs`: deterministic capability selection, request validation, redaction and fail-closed response normalization.
- `fixtures/` and `demo.mjs`: synthetic, repeatable Company Check, ambiguity, outage, conditioned capability, 402, replay and idempotency scenarios.
- `SYSTEM-PROMPT.md`, `DEMO.md`, `CAPABILITY-MATRIX.md`, `OFFICIAL-SUPPORT.md`, `VIDEO-SCRIPT.md` and `PUBLISHING-CHECKLIST.md`.
- `docs/`: novice installation, use, decisions, pricing, security, fixtures, troubleshooting, production, maintenance, rollback, cases and public-repository boundary.

## Observed publication state

On 2026-08-11 the authenticated Relevance Builder workspace showed six Tool submissions, each `pending` and `Unpublished`: the five intended commercial capabilities plus Company Capability Passport. None has a public Marketplace URL yet. Passport is outside the initial public slice and must be withdrawn from Marketplace review while the private Tool remains protected. The internal agent is still named `RunOnProof Demo Agent`, is not a public Marketplace Agent, and currently has eleven connected Tools because five historical UK aliases remain alongside the six global Tools.

The truthful terminal state is `RELEVANCE_PUBLICATION_REVIEW_PENDING`. Execution requires approval, automatic payment is absent, and HTTP 402 becomes `REVIEW`. No Relevance-originated production verification, x402 signature, settlement or external installation has been certified.

See `docs/INDEX.md`, `docs/WORKSPACE-EVIDENCE.md` and `public-production/README.md`. Sanitized guides, contracts and fixtures are published in `runonproof/docs`; private workspace URLs and project identifiers remain only in the private repository.

The private commercial-outreach preparation is under `commercial-outreach/`. It contains the dedicated Supplier Approval Tool contract, strict schemas, eight synthetic fixtures, pilot-model comparison, non-activated quota proposal, controlled demo, prepared Marketplace copy, unsent British English proposal, trust package, and the machine-readable outreach gate. These materials are not a Marketplace submission, contact, payment, contract, quota activation or production certification.

## Recreate in another development project

1. Log in to [Relevance AI](https://app.relevanceai.com/) and open the intended development project.
2. Create a Tool from scratch named `RunOnProof UK Company Verification`.
3. Add the inputs from `schemas/tool-input.schema.json#/$defs/companyCheck`.
4. Add an **API** step: `POST https://api.runonproof.com/v1/gb/solutions/company-check`.
5. Set `Accept: application/json`, `Content-Type: application/json`, and `Idempotency-Key` from the exact `idempotency_key` input. Bind the same key into the JSON body.
6. Choose JSON response format and leave “Throw error on 4xx/5xx” off so a 402/409/422/503 can be routed safely.
7. Add a JavaScript step with the logic in `runtime.mjs#normalizeDecision`, expose only the normalized schema, and attach the Tool to a development agent using `SYSTEM-PROMPT.md`.
8. Configure Tool failure policy with zero automatic retries. A replay GET may be retried; a POST retry is permitted only with the identical payload and idempotency key.
9. Run the synthetic scenarios before any live call. Marketplace approval and public discoverability must be verified independently; a pending submission is not an installation.

The native editor step is required because current official documentation does not document an OpenAPI-to-Tool import flow or a stable repository-side Tool import file. `authoring-manifest.json` is therefore an auditable authoring source, not a falsely labeled one-click import.

## Environment and secrets

The production base URL is fixed to `https://api.runonproof.com`. The read-only coverage, health and public metadata calls require no secret. If a deployment later requires a RunOnProof API token, save it under Relevance AI **Integrations & API Keys → Custom API Keys** and reference it as a Relevance secret; never paste it into the manifest, prompt, log or fixture.

This bundle intentionally has no payer key, wallet, x402 proof, cookie or reusable payment credential. A 402 produces `REVIEW` and a price display. Relevance AI does not document a native user-wallet x402 signer. A real purchase therefore requires the non-custodial, human-controlled handoff in `public-production/PAYMENT-HANDOFF.md`; only its short-lived output may populate the optional `payment_signature` input for the exact approved request.

## Run and test

```bash
npm run demo:relevance-ai
npm run test:relevance-ai
```

The demo is synthetic, performs no network call and has an economic delta of `0.00 USDC`.

## Troubleshooting

- **402 PAYMENT_REQUIRED** — expected quote boundary for a paid offer. Show the canonical price and stop. Do not retry or manufacture a payment header.
- **409** — the same idempotency key was used with a different payload. Stop; do not generate a new key to conceal the conflict.
- **422** — input is invalid or insufficient. Ask only for the required information and do not charge.
- **503 / unhealthy source** — return `REVIEW`, preserve reason codes and try later only under an explicit retry policy.
- **Large response** — keep only declared fields and fail closed above 64 KiB. The official docs do not publish an API-step response limit, so the RunOnProof adapter applies its own conservative ceiling.
- **Tool does not appear** — verify it is attached in the Agent's Tools tab. For MCP, Relevance AI requires a public remote Streamable HTTP server; local JSON MCP configuration is unsupported.

## Official Relevance AI sources reviewed

- [API integration](https://relevanceai.com/docs/get-started/core-concepts/api-integration)
- [API Tool step](https://relevanceai.com/docs/build/tools/tool-steps/api)
- [MCP Client](https://relevanceai.com/docs/integrations/mcp/mcp-client)
- [Give Your Agent Tools](https://relevanceai.com/docs/build/agents/build-your-agent/tools)
- [Share your Tool](https://relevanceai.com/docs/build/tools/share-your-tool)
- [Pricing](https://relevanceai.com/docs/get-started/pricing)

Documentation checked on 2026-08-09. Relevance AI documents custom headers, parameters, JSON response handling, encrypted project-scoped secrets and configurable agent retries. It does not publish a fixed API-step timeout, response-size limit, or automatic OpenAPI import contract on the reviewed pages; those are recorded as `NOT_DOCUMENTED` rather than guessed.
