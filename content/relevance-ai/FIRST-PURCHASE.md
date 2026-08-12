# First production purchase

This runbook governs exactly one Company Check purchase at `0.04 USDC`. It must not be used until the Marketplace listing is approved, an external test user can install it, and a reviewed non-custodial x402 signer is available.

## Before the quote

- Confirm production SHA `4a545d4fa39fd55400862c5efd096630293ced9c` and healthy readiness.
- Confirm `gb.solution.company_check.v1` or `br.solution.company_check.v1` is available at `0.04 USDC`.
- Use one safe real business identifier and a client-generated idempotency key.
- Record the request-body digest; do not record private data beyond the approved test evidence.
- Confirm the Agent Tool is `Approval Required`, automatic payment is off and paid POST retry count is zero.

## Quote and REVIEW

Call Company Check without `payment_signature`. The expected response is HTTP 402. Show:

- product and country;
- price `0.04 USDC`;
- Base network and asset;
- payee from the signed challenge;
- request digest and idempotency key;
- quote expiry;
- explanation that no verification has run and no payment has occurred.

The Agent must return `REVIEW` and wait. A 402 is not approval, settlement or delivery.

## Human approval and payment

The owner must explicitly approve this exact quote. The trusted wallet surface then signs locally. Never paste or store a private key or seed phrase in Relevance AI. Retry once with the identical body, digest, idempotency key and the short-lived `Payment-Signature`.

Stop on any mismatch, expiry, changed price, changed payee, changed body, 409 conflict, failed verification or uncertain settlement. Do not create a new key to conceal a conflict.

## Required evidence

The certification record must bind:

1. unpaid quote and HTTP 402;
2. human approval event;
3. x402 signature fingerprint without secret material;
4. facilitator verify result;
5. settlement and on-chain transaction hash;
6. RunOnProof ledger row for exactly `0.04 USDC`;
7. one committed execution and delivery;
8. the Agent-visible result;
9. decision, reason codes, evidence, coverage, freshness and limitations;
10. an identical replay proving no second settlement or ledger charge.

## Interpret the result

- `PROCEED`: supported only when required sources are healthy and the canonical authorization allows the bounded action.
- `REVIEW`: a person must resolve ambiguity, missing evidence, stale data, conditioned coverage or a payment boundary.
- `STOP`: do not continue when the policy blocks or denies the action.
- `UNKNOWN`: do not convert missing or unavailable evidence into approval; treat it as `REVIEW` or `STOP` according to the envelope.

A no-match is scoped to the named sources and time window. Company Check does not prove solvency, bank-account ownership, tax registration, universal licensing, complete beneficial ownership or absence of all risk.

## Replay

Repeat the identical request with the same idempotency key, or use the committed execution replay route. The response must identify replay and show no new quote, verification, settlement or charge. Any second `0.04 USDC` delta fails certification.

## Current block

As of 2026-08-11 the Marketplace submissions are pending and unpublished, and no native Relevance x402 signer is documented. Do not execute this runbook until both conditions are resolved and the owner approves the displayed quote.
