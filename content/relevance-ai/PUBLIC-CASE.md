# Public case: an AI agent that stops when the proof is not enough

An AI agent may need to add a supplier, trust a company, or prepare a payment. Before it acts, it needs to know which legal company it is dealing with and what reliable evidence is available.

RunOnProof gives the agent a narrow company decision with the proof and limits attached. The initial Relevance AI product targets Company Check, Supplier Approval, Invoice & Payee Verification, Payment Authorization, and Vendor Change & Continuous Authorization.

## What the demonstration shows

1. The user supplies an exact UK company number.
2. The agent selects the smallest suitable RunOnProof check.
3. It shows the product and price before a paid action.
4. If payment authorization is missing, it returns `REVIEW` and stops.
5. When a result exists, it keeps the evidence, freshness, coverage, and limitations visible.
6. It does not turn a source outage or no-match into a promise that everything is safe.

The observed synthetic smoke displayed `gb.solution.company_check.v1` and `0.04 USDC`, required approval, and made no production verification or payment.

## The three answers

- `PROCEED`: the current evidence supports the exact action under the named conditions.
- `REVIEW`: a person, missing input, source recovery, evidence, or payment authorization is needed.
- `STOP`: the action must not continue.

These are action-specific answers, not a permanent trust score.

## What is real and what is synthetic

The Tools and demo agent are installed privately in the RunOnProof Relevance AI project. Six Tool listings are under Marketplace review, but all remain unpublished. The case uses synthetic fixtures for safe, repeatable tests. Synthetic company numbers are not live Companies House results.

The pending submissions do not imply publication, partnership, endorsement, or approval by Relevance AI. Company Capability Passport is outside the five-capability public target and must be withdrawn from review.

## Reproduce the case

Developers can run the synthetic cases, connect the certified remote MCP or recreate a Tool in a private development project. External users cannot install from Marketplace until review completes. The payment boundary remains closed unless the separately reviewed non-custodial approval handoff is deliberately introduced.

## Short version

RunOnProof helps agents check the company and the evidence before they trust, onboard, or pay. If the proof is incomplete, the source is unavailable, or payment is not authorized, the agent stops instead of guessing.
