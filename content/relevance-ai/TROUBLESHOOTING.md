# Troubleshooting

Use the symptom first. Stop economic execution while the cause is unknown.

| Symptom | Likely cause | Safe correction |
| --- | --- | --- |
| Tool is not available to the agent | Tool not connected, wrong version, or not published internally | Open the agent’s Tools/Connected resources panel, attach the intended published version, save, and retest synthetically |
| Agent answers without calling the Tool | Instructions do not require the check, input is missing, or Tool description is unclear | Confirm the exact company number, preserve `SYSTEM-PROMPT.md`, and verify the Tool description |
| Agent chooses Supplier Approval for a Company Check | Capability selection is too broad | Restore the “smallest suitable capability” rule; never silently upgrade cost |
| HTTP 402 appears as success | 4xx/5xx throwing or normalization is wrong | Leave raw 4xx/5xx available to normalization and map 402 to `REVIEW` |
| Tool retries after 402 or 503 | Automatic retry is enabled | Disable automatic retry for the paid POST; permit only bounded replay retry |
| HTTP 409 | Same idempotency key used for a different payload | Stop, inspect the original intent, and do not create a replacement key unless this is truly a new request |
| HTTP 422 | Missing or invalid input | Ask only for the required field; do not charge |
| HTTP 503 or unhealthy source | Required source unavailable | Return `REVIEW`; wait or use an approved independent evidence path |
| Empty/no-match result is described as safe | Prompt lost the scoped-claim rule | Restore the no-finding limitation and present coverage, time, and matching scope |
| Price is missing | Prompt/Tool output omitted canonical product metadata | Read current catalog truth and show product and price before approval |
| Wrong or old price | Documentation or Tool drift | Stop paid use; update manifest, examples, tests, and Tool version in one change |
| Response is too large | Upstream payload escaped normalization | Enforce normalized schema and the conservative response ceiling; fail closed |
| Secrets appear in output | Header/body/log redaction failed | Disable Tool, revoke/rotate secret, remove exposure, and recertify |
| Real production request ran during fixture test | URL or test method was wrong | Disable Tool, preserve history, reconcile economics, and use copied synthetic responses |
| Agent says Marketplace/public but sharing is private | State vocabulary is inaccurate | Correct wording to “published internally in the project” |

## Tool does not appear

Confirm you are in the correct project. A Tool created in one project may not appear in another. Confirm it is saved and published internally, then reopen the agent editor. Avoid creating a duplicate before checking versions and project identity.

## HTTP 402 details

402 is expected for an unpaid paid offer. The safe result contains `REVIEW`, product, price, and an approval requirement. It must not include a fabricated verification decision. Do not add a payment header to make the test pass.

## Source outage

Read the runtime coverage and source-health endpoints. If a required source is unhealthy, keep dependent decisions closed. Independent capabilities may continue only when their own required sources are healthy.

## UI labels differ from this guide

Relevance AI can rename buttons. Choose the equivalent action only when its meaning is clear: create blank Tool, add API step, set inputs, configure response handling, attach Tool, require approval, and publish privately. If a new UI option changes retry, sharing, or payment behavior, stop and review official documentation before selecting it.

## Escalation evidence

When asking a maintainer for help, include:

- Tool and agent version identifiers;
- timestamp and environment;
- synthetic fixture name;
- HTTP status and redacted reason codes;
- whether production was contacted;
- quote/charge/settlement state;
- screenshot with secrets and personal data removed.

Do not send passwords, MFA codes, tokens, cookies, wallet material, or payment proofs.
