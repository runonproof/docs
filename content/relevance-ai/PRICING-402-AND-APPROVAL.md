# Pricing, HTTP 402, and approval

This page separates two costs that are easy to confuse: Relevance AI platform credits and the RunOnProof price in USDC.

## Relevance AI credits

Relevance AI may count platform usage according to the account plan. Those credits belong to Relevance AI and are not a RunOnProof settlement. Check the workspace usage page for current platform rules.

The Marketplace listing is currently configured as **Free**. This means there is no Relevance Marketplace purchase price to clone the Tool. It does not make RunOnProof production calls free.

## RunOnProof price

RunOnProof paid products use a canonical USDC price. The initial UK Company Check is documented as:

- product: `gb.solution.company_check.v1`;
- price: `0.04 USDC`.

Always read runtime/catalog truth before a real purchase because prices and sellability can change through a controlled release.

## What HTTP 402 means

HTTP 402 means the server has reached a payment boundary and is requesting valid payment authorization. It does **not** mean:

- payment succeeded;
- a verification result exists;
- the agent may pay;
- the user approved payment;
- the request should be retried automatically.

The Relevance AI integration converts 402 to `REVIEW`, shows the product and canonical price, and stops.

## Why payment is not automatic

The Tool intentionally contains no wallet, private key, payer key, x402 proof, or reusable payment credential. Relevance AI does not document a native user-wallet x402 signer. A separate non-custodial handoff must display and bind the exact quote, obtain human approval, ask the user's wallet to sign locally, and return only the short-lived `Payment-Signature` for that request.

## Human approval

The Tool execution policy is **Approval Required**. Approval to make the unpaid quote request is a workflow control; it is not authorization to transfer USDC. A second explicit approval at the economic boundary must show product, country, exact `0.04 USDC` price, Base network, payee, request digest, idempotency key and expiry before the wallet signs.

Required sequence:

`request → quote → REVIEW → human approval → wallet signature → payment → execution → result`

## Idempotency and duplicate prevention

An idempotency key represents one exact request. Repeating the exact payload with the same key should converge on the same committed economic result rather than charge twice. Reusing the same key with a changed payload must return a conflict, typically HTTP 409.

On 409:

1. stop;
2. compare the intended request with the original;
3. do not create a new key to conceal the mismatch;
4. create a new request only when the user truly intends a distinct action.

## Replay

Replay retrieves a committed execution without a new source query or additional product charge. Prefer replay when its evidence and validity window still answer the same question. Replay does not make stale evidence current.

## How to verify the safety boundary

Before publishing an agent version internally, confirm:

- Tool execution requires approval;
- automatic retry for paid POST is off;
- no payment header or payment secret exists;
- 402 becomes `REVIEW`;
- price is displayed before continuation;
- economic activity fields say no charge/no settlement in fixture tests;
- platform usage and RunOnProof USDC are reported separately.

If any of these checks fail, disable the Tool version before further testing.

See [First production purchase](FIRST-PURCHASE.md) for the evidence required from one controlled Company Check.
