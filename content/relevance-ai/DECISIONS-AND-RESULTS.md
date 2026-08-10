# Decisions and results

RunOnProof separates evidence from the recommendation made to the agent. The recommendation is narrow: it answers whether the named action can continue under the named policy and the evidence available at that time.

## PROCEED

`PROCEED` means the canonical decision and authorization allow the requested action and all required sources are healthy enough for that claim. It may still carry conditions and limitations.

`PROCEED` does not mean:

- the company is safe for every purpose;
- every source in the world was checked;
- the company will remain unchanged;
- a bank account belongs to the company;
- an invoice is authentic;
- all owners and controllers are known.

## REVIEW

`REVIEW` means the agent must not continue automatically. Common causes include:

- HTTP 402 waiting for separate payment authorization;
- ambiguous legal entity;
- missing or invalid input;
- source outage or stale evidence;
- incomplete required evidence;
- a conditioned capability needing qualified external evidence;
- a policy result such as hold, retry, no decision, or manual review.

The next action is usually to ask for the missing company number, wait for source recovery, obtain approved evidence, or ask a human decision-maker.

## STOP

`STOP` means the requested action must not continue. It can represent a negative finding, a denial, a block, a prohibited action, or a capability the agent must not attempt.

Do not rewrite `STOP` as a softer recommendation merely to complete the workflow.

## Evidence fields

Evidence records can include a source identifier, source version or snapshot, retrieval time, parser version, digest, freshness, and permitted claims. These fields make a decision replayable and auditable without turning the evidence into a broader claim.

## Coverage

Coverage says exactly where and how far the check reaches. For the initial UK case, Companies House and the UK Sanctions List have different meanings. A no-match in the UK list is limited to that list, snapshot, identity resolution, and matching policy.

## Freshness

Freshness describes how current the evidence is. A result can be structurally valid but too old for a new consequential action. The runtime health and coverage endpoints are the current source of truth; the date on this document is not a health timestamp.

## Limitations

Limitations are part of the result, not legal fine print to hide. The agent must present the limitations needed to prevent the user from treating a narrow check as universal trust.

## No finding is not a guarantee

`NO_FINDING`, an empty list, or no sanctions match means only that the declared search did not produce a finding under the current scope. It does not prove that no risk exists.

## Decision mapping rule

Only a canonical allow result with healthy required sources may become `PROCEED`. Uncertainty, outages, incomplete required evidence, holds, retries, and payment boundaries become `REVIEW`. Denied, blocked, and prohibited states become `STOP` or a non-continuation `REVIEW` according to the canonical machine action.

If the response is malformed, contradictory, or outside the schema, fail closed as `REVIEW`; never guess.
