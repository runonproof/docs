# Rollback and removal

Rollback should stop new execution quickly while preserving enough evidence to understand what happened.

## Immediate disablement

If the Tool behaves unsafely:

1. stop new agent runs;
2. disconnect the Tool from the agent or select a known-safe prior Tool version;
3. keep sharing private;
4. disable any retry automation;
5. preserve execution history and economic records;
6. revoke exposed credentials in their owning systems.

Do not delete evidence before reconciliation.

## Roll back to a prior version

1. Identify the last known-good Tool and agent versions.
2. Compare manifest, inputs, API step, normalization, retry, and approval settings.
3. Reconnect the agent to the known-good Tool version.
4. run synthetic fixtures;
5. confirm no production call or payment occurred;
6. document the rollback time, reason, versions, and operator.

## Remove the integration

For a complete private-workspace removal:

1. disconnect the Tool from every agent;
2. archive or disable the agent;
3. archive or disable the Tool;
4. revoke integration-specific secrets, if any;
5. confirm scheduled or triggered runs no longer reference it;
6. preserve required audit records according to policy;
7. remove public links or claims that imply availability.

Deletion is the final step, not the first. Prefer reversible archive/disable controls until investigation and retention obligations are complete.

## Repository rollback

Use a normal revert or corrective pull request. Do not rewrite shared branch history. Keep contract, fixtures, prompt, manifest, and documentation coherent. If a public docs page announces the faulty state, correct it in the same release or mark the integration unavailable.

## Economic reconciliation

If an unintended live call occurred, record separately:

- quote creation;
- payment authorization;
- charge;
- settlement;
- refund or reversal;
- replay;
- duplicate-prevention result.

No response, source outage, or failure should be reported as a successful paid decision. Escalate unexplained economic mutations before re-enabling.

## Recovery gate

Re-enable only after root cause is corrected, repository tests are green, all seven synthetic cases pass, approval and no-auto-payment are confirmed, and the new versions are recorded.
