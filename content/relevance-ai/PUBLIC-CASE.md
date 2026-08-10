# Public case: an AI agent that stops when the proof is not enough

An AI agent may need to add a supplier, trust a company, or prepare a payment. Before it acts, it needs to know which legal company it is dealing with and what reliable evidence is available.

RunOnProof gives the agent a narrow company decision with the proof and limits attached. In the Relevance AI demonstration, the agent uses a RunOnProof Tool to prepare a UK Company Check.

## What the demonstration shows

1. The user supplies an exact UK company number.
2. The agent selects the smallest suitable RunOnProof check.
3. It shows the product and price before a paid action.
4. If payment authorization is missing, it returns `REVIEW` and stops.
5. When a result exists, it keeps the evidence, freshness, coverage, and limitations visible.
6. It does not turn a source outage or no-match into a promise that everything is safe.

The synthetic `payment-required` fixture displays `gb.solution.company_check.v1` and `0.04 USDC`, requires approval, and makes no production verification or payment.

## The three answers

- `PROCEED`: the current evidence supports the exact action under the named conditions.
- `REVIEW`: a person, missing input, source recovery, evidence, or payment authorization is needed.
- `STOP`: the action must not continue.

These are action-specific answers, not a permanent trust score.

## What is real and what is synthetic

The public case uses synthetic fixtures for safe, repeatable tests. Synthetic company numbers are not live Companies House results, and this repository exposes no private Relevance AI workspace state.

The integration has not been published in the Relevance AI Marketplace and does not imply a partnership, endorsement, or approval by Relevance AI.

## Reproduce the case

Developers can run the seven synthetic cases from the RunOnProof repository, then follow the installation guide to recreate the Tool and agent in a private development project. The payment boundary remains closed unless a separate authorized payment client is deliberately introduced.

## Short version

RunOnProof helps agents check the company and the evidence before they trust, onboard, or pay. If the proof is incomplete, the source is unavailable, or payment is not authorized, the agent stops instead of guessing.
