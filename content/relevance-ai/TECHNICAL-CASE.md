# Technical case: evidence-first UK company verification in Relevance AI

## Problem

An AI agent can call an API, but that does not mean it knows whether the source is healthy, the company identity is unambiguous, the evidence supports the intended action, or a payment is authorized. A generic successful HTTP call can hide uncertainty and encourage an agent to continue too far.

## Integration design

RunOnProof is exposed through a Relevance AI API Tool step. The first Tool verifies a UK Companies House company number through the Company Check solution. Repository-owned selection and normalization rules turn the canonical response into `PROCEED`, `REVIEW`, or `STOP` while retaining evidence, coverage, freshness, limitations, and economic activity.

The Marketplace submissions use API Tool steps because they expose a narrow product with explicit inputs and prices. Relevance AI also supports the certified RunOnProof remote Streamable HTTP MCP at `https://cdo-production.up.railway.app/v1/agent/mcp`. Direct MCP connection is a supported secondary path, not proof of Marketplace approval and not an x402 wallet.

## Request contract

The primary business inputs are the exact `company_number` and an `idempotency_key` for the exact request. The Tool performs:

```text
POST https://cdo-production.up.railway.app/v1/gb/solutions/company-check
```

It sends JSON headers, binds the idempotency key, accepts JSON, and leaves 4xx/5xx available to the normalization step. Automatic retry is disabled for the paid POST.

## Economic boundary

The product is `gb.solution.company_check.v1`, documented at `0.04 USDC` for the observed case. An unpaid request can return HTTP 402. The Tool maps 402 to `REVIEW`, displays the product and price, and stops. It has no wallet or payment proof.

## Decision safety

Only a canonical allow result with healthy required sources can map to `PROCEED`. Ambiguity, missing evidence, outage, stale source, hold, retry, no-decision, or payment boundary maps to `REVIEW`. Denied, blocked, prohibited, and unsupported actions do not continue.

No-match is explicitly limited by list, identity match, policy, and observation time. Company registration evidence is not used to claim bank ownership, invoice authenticity, complete beneficial ownership, universal licensing, solvency, or absence of all risk.

## Reproducibility

The repository includes a versioned authoring manifest, JSON schemas, deterministic runtime, system prompt, seven synthetic fixtures, unit tests, capability matrix, support research, installation guides, and rollback instructions.

```bash
npm run demo:relevance-ai
npm run test:relevance-ai
```

The synthetic demo has an economic delta of `0.00 USDC` and makes no network call.

## Observed result

On 2026-08-10, the Tool and demo agent existed in the private RunOnProof Relevance AI project and were connected. Execution required approval. A synthetic smoke showed the correct product and `0.04 USDC`, returned `REVIEW`, and stopped without a production verification, payment, settlement, or platform credit charge in that smoke.

## Limitations

Six Tool submissions are pending and unpublished, so the installation is not Marketplace-public. Complete synthetic coverage is repository CI evidence; only a smaller safe smoke was observed in the workspace. Runtime health and price must be read at execution time. Relevance AI UI and platform behavior can change independently of this repository.

## Why it matters

The case demonstrates that an agent integration can make uncertainty and cost explicit before a consequential action. The useful product is not merely an API response; it is a narrow, auditable permission boundary with evidence attached.
