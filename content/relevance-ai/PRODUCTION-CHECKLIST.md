# Production checklist

This checklist controls the move from pending Marketplace review to a real public production workflow. Completing repository installation or submission does not itself authorize a production call or payment.

## Contract and catalog

- [ ] Repository branch is synchronized with the current `main`.
- [ ] `authoring-manifest.json` matches the input/output schemas and runtime.
- [ ] Product ID, route, price, and purchasability match canonical runtime/catalog truth.
- [ ] Capability matrix declares conditioned and unsupported capabilities accurately.
- [ ] Public claims do not exceed current coverage.
- [ ] Production SHA is `4a545d4fa39fd55400862c5efd096630293ced9c` or a separately certified successor.
- [ ] MCP Registry identity `io.github.runonproof/cdo@3.0.0` remains active.

## Tool configuration

- [ ] Correct production URL is visible and reviewed.
- [ ] `Accept` and `Content-Type` are JSON.
- [ ] Dynamic idempotency header/body binding is correct.
- [ ] Raw 4xx/5xx responses reach normalization.
- [ ] Automatic retry for paid POST is off.
- [ ] Response schema and size ceiling are enforced.
- [ ] Tool execution says **Requires approval**.
- [ ] No wallet, payer secret, or reusable payment proof exists in Relevance.
- [ ] An optional payment-signature input is usable only after the exact human-approved external handoff.

## Agent configuration

- [ ] Current `SYSTEM-PROMPT.md` is installed.
- [ ] The agent selects the smallest suitable capability.
- [ ] Product and price are shown before economic action.
- [ ] `PROCEED`, `REVIEW`, and `STOP` mapping is correct.
- [ ] Evidence, coverage, freshness, limitations, and economics are presented.
- [ ] No-match is not described as universal clearance.

## Tests

- [ ] Repository demo passes all seven fixtures.
- [ ] Repository unit tests pass.
- [ ] Tool normalization is tested with synthetic response bodies.
- [ ] Agent smoke stops at 402 and displays price.
- [ ] Conditioned capability stops before HTTP.
- [ ] Source outage becomes `REVIEW`.
- [ ] Idempotency conflict becomes 409/stop.
- [ ] Execution history shows no unintended production call or payment.

## Public distribution

- [ ] The five target listings are approved and public.
- [ ] Company Capability Passport is not publicly listed.
- [ ] A public URL is recorded for each approved listing or consolidated Agent.
- [ ] An independent Relevance account/project can find and clone the product.
- [ ] Inputs, listing-free status and per-call USDC price are understandable without owner assistance.

## Operational readiness

- [ ] Runtime coverage and source health are checked.
- [ ] An owner is defined for Tool disablement and incident handling.
- [ ] Rollback version and removal steps are recorded.
- [ ] Logs redact secrets and unnecessary data.
- [ ] Monitoring distinguishes quote, charge, settlement, replay, and failure.
- [ ] A support path exists for ambiguous results and source outages.

## Economic authorization

The current Relevance AI Tool is not an x402 signer. Before one controlled purchase, require a separate review of the non-custodial wallet handoff, exact approval semantics, `0.04 USDC` cap, settlement reconciliation, duplicate prevention, failure/no-charge behavior and rollback. Do not interpret this checklist as approval of a specific quote.

## Release evidence

Record the repository SHA, Tool version, agent version, project, test results, reviewer, source-health timestamp, and exact economic delta. Publish only the state proven by that evidence.
