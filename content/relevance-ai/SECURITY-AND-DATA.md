# Security and data

The safest integration sends only the information required for the exact business check and stores no payment material.

## Allowed data for Company Check

- exact UK company number;
- idempotency key that contains no personal or secret data;
- the narrow intent needed by the canonical contract.

Do not add names, emails, addresses, bank details, identity documents, cookies, tokens, or free-form confidential notes unless a later reviewed contract explicitly requires and protects them.

## Secrets

The current public coverage and health reads need no secret, and the initial Tool has no payer secret. If a future RunOnProof API token becomes necessary:

1. create it through the approved RunOnProof process;
2. store it in Relevance AI’s project-scoped secret/key facility;
3. reference the secret dynamically;
4. never paste its value into Git, prompts, fixtures, URLs, screenshots, logs, tickets, or chats;
5. rotate and revoke it through the owning system.

## Forbidden material

Do not store in this integration:

- wallet private keys or seed phrases;
- raw x402 proofs or reusable payment signatures;
- browser cookies or session tokens;
- production database credentials;
- personal documents;
- unrestricted source dumps;
- secrets inside idempotency keys.

## Logging and redaction

Logs should preserve correlation, status, reason codes, response class, and timing while redacting authorization headers, payment material, tokens, cookies, and unnecessary personal data. Do not log the full idempotency value when a stable redacted digest is enough.

## Response minimization

Expose only the normalized output schema. Do not pass arbitrary upstream HTML, oversized responses, debug traces, or headers to the agent. The repository adapter uses a conservative 64 KiB ceiling because the reviewed Relevance AI API Tool documentation did not publish a fixed response-size limit.

## Source and claim safety

- Source failure never means no finding.
- No-match is list- and time-scoped.
- Company registration evidence does not prove bank ownership or invoice authenticity.
- Conditioned capabilities remain non-purchasable until their required source access and coverage are certified.

## Access control

Keep the Tool and agent private to the RunOnProof project until a separate sharing decision. Give edit access only to maintainers who understand the manifest and payment boundary. Review project members before adding any future secret.

## Incident response

If a secret or payment credential is exposed:

1. disable the affected Tool version;
2. revoke or rotate the credential in the owning system;
3. inspect execution history for use;
4. remove the value from visible configuration and Git history using an approved security process;
5. document the incident without reproducing the secret;
6. recertify with synthetic tests before re-enabling.

If the Tool executed an unintended production request, preserve the execution and economic records, stop new runs, reconcile any settlement, and follow the rollback guide.
