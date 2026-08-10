# Everyday use

Use the integration when an agent needs evidence about the exact UK legal company before trusting it or taking the next business step.

## Good requests

- “Verify UK company 01234567 before I add it as a supplier. Do not pay without approval.”
- “Check the legal identity and status of company 01234567. Show evidence freshness and limitations.”
- “Replay execution `…` instead of buying the same check again.”
- “Tell me whether the current evidence supports proceeding, reviewing, or stopping.”

## Requests that need clarification

“Check Acme” is not enough because several legal entities may share a similar name. Ask for the exact Companies House number. Do not guess which company the user meant.

## Requests this Tool must refuse or redirect

The current Company Verification Tool must not claim to prove:

- ownership of a bank account;
- tax registration;
- invoice authenticity or duplication;
- a universal business licence;
- solvency or universal good standing;
- complete beneficial ownership;
- absence of all sanctions or all risk.

If the requested capability is conditioned or unsupported, return `STOP` or `REVIEW` as appropriate and explain which external evidence is missing.

## What happens during a normal request

1. The agent identifies the user’s exact action.
2. It checks current RunOnProof coverage and source health when a live execution is contemplated.
3. It chooses the smallest suitable product.
4. If an existing execution already answers the same question, it prefers replay.
5. Before a paid call, it shows product ID and price.
6. It waits for the approval required by the workflow.
7. It reports `PROCEED`, `REVIEW`, or `STOP`, with evidence, freshness, coverage, limitations, and economic state.

## Reading the answer

Do not read only the first word. Check:

- **recommendation** — the machine-oriented next step;
- **reason codes** — why the decision was reached;
- **coverage** — what jurisdiction, source, and claim were actually checked;
- **evidence** — source references supporting the result;
- **freshness** — when evidence was observed and how long it remains usable;
- **limitations** — what the result does not prove;
- **economic activity** — whether a quote, charge, or settlement occurred;
- **replayed** — whether the result came from a stored execution.

## Safe habits

- Use the exact company number.
- Ask for limitations every time.
- Prefer replay when the stored execution is still suitable.
- Never create a new idempotency key just to escape a 409.
- Recheck coverage and source health before consequential live use.
- Treat old screenshots as history, not current source health.
- Escalate `REVIEW` to a human or request the missing evidence.

## Example interpretation

If the answer is `REVIEW` because Companies House is unavailable, wait or use an approved independent source. Do not interpret source failure as “the company has no problems.”

If the answer is `PROCEED` with limitations, proceed only within the named action and conditions. It is not a reusable seal of trust for every future action.

If the answer is `STOP`, do not continue the action. Read the reason codes to determine whether the block is a negative finding, an unsupported request, or a policy prohibition.
