# Fixtures and expected results

The seven fixtures test the decision contract without a live verification or payment. Company numbers beginning with `ZZ` are deliberately synthetic and must never be described as Companies House evidence.

Run the repository suite with:

```bash
npm run demo:relevance-ai
npm run test:relevance-ai
```

Run one scenario with:

```bash
node integrations/relevance-ai/demo.mjs company-active
```

## 1. Company active

- Fixture: `company-active`
- Expected Tool: Company Check
- Expected recommendation: `PROCEED`
- Expected economics: no quote settlement, charge, or production mutation
- Important assertion: evidence, freshness, coverage, and limitations remain visible

This fixture proves mapping behavior, not the live status of a real company.

## 2. Ambiguous company

- Fixture: `ambiguous-company`
- Expected recommendation: `REVIEW`
- Expected next action: request the exact legal company number
- Forbidden behavior: selecting one legal entity by guesswork

## 3. Source unavailable

- Fixture: `source-unavailable`
- Expected recommendation: `REVIEW`
- Expected economics: no decision and no charge
- Forbidden behavior: translating source failure into no finding or approval

## 4. Conditioned capability

- Fixture: `conditioned-capability`
- Expected recommendation: `STOP`
- Expected network activity: none
- Expected explanation: the required qualified external evidence or certified source is unavailable

## 5. Payment required

- Fixture: `payment-required`
- Expected recommendation: `REVIEW`
- Expected product: `gb.solution.company_check.v1`
- Expected price: `0.04 USDC`
- Expected behavior: require explicit external payment authorization; redact payment material
- Expected economics: no payment and no settlement

## 6. Replay

- Fixture: `replay`
- Expected recommendation: `PROCEED` for the fixture result
- Expected flag: `replayed=true`
- Expected source activity: zero new live-source calls
- Expected product charge: `0.00 USDC` additional

Replay proves retrieval of a committed execution, not current source freshness beyond the stored validity window.

## 7. Idempotency

- Fixture: `idempotency`
- Identical payload and key: converge on the original request/result
- Changed payload with the same key: HTTP 409 conflict
- Forbidden behavior: inventing a new key to conceal the conflict

## Workspace QA order

1. Run repository tests first.
2. Test the Tool’s normalization with copied synthetic response bodies rather than a production POST.
3. Test the agent’s explanation and Tool selection.
4. Confirm `Requires approval` remains enabled.
5. Inspect history for zero unintended production calls and payments.

## Evidence to record

Record test date, repository SHA, Tool version, agent version, cases run, pass/fail, and reviewer. Record economic delta separately. Do not save secrets, payment material, or real personal data.

The complete seven-case contract is certified by this repository's synthetic tests. Do not describe those fixtures as live company checks or as proof of a private Relevance AI workspace execution.
