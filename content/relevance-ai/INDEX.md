# RunOnProof for Relevance AI — documentation index

This directory is the canonical maintenance source for the RunOnProof Relevance AI product. It explains public installation, the five-capability production slice, the human-approved x402 boundary, result interpretation, maintenance and removal.

The executable contracts remain one directory above this documentation:

- `../authoring-manifest.json` — authoring source and safety defaults;
- `../schemas/` — input and normalized output contracts;
- `../runtime.mjs` — deterministic selection and normalization;
- `../SYSTEM-PROMPT.md` — agent instructions;
- `../fixtures/` and `../demo.mjs` — synthetic cases;
- `../CAPABILITY-MATRIX.md` — consumer view of current coverage.

## Choose your path

If you have never used Relevance AI, follow these pages in order:

1. [Install from zero](INSTALL-FROM-ZERO.md)
2. [Create the Tool](CREATE-TOOL.md)
3. [Create and connect the agent](CREATE-AND-CONNECT-AGENT.md)
4. [Run the seven safe fixtures](FIXTURES-AND-EXPECTED-RESULTS.md)
5. [Use the agent day to day](EVERYDAY-USE.md)
6. [Understand decisions and evidence](DECISIONS-AND-RESULTS.md)
7. [Understand price, HTTP 402 and approval](PRICING-402-AND-APPROVAL.md)
8. [Prepare the first production purchase](FIRST-PURCHASE.md)

For operators and developers:

- [Security and data](SECURITY-AND-DATA.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Production checklist](PRODUCTION-CHECKLIST.md)
- [Update guide](UPDATE-GUIDE.md)
- [Rollback and removal](ROLLBACK-AND-REMOVAL.md)
- [Observed workspace evidence](WORKSPACE-EVIDENCE.md)
- [Technical case](TECHNICAL-CASE.md)

For communication and future distribution:

- [Public case](PUBLIC-CASE.md)
- [Copy for docs.runonproof.com](PUBLIC-DOCS-COPY.md)
- [Sidebar information architecture](SIDEBAR-INFORMATION-ARCHITECTURE.md)
- [Public repository architecture](PUBLIC-REPOSITORY-ARCHITECTURE.md)
- [Marketplace submission guide](MARKETPLACE-SUBMISSION-GUIDE.md)

## Current state — 2026-08-11

The RunOnProof account has verified Relevance Builder access. Six Tool listings were submitted to the Relevance AI Marketplace and are all `pending` and `Unpublished`. Five belong to the initial commercial slice: Company Check, Supplier Approval, Invoice & Payee Verification, Payment Authorization, and Vendor Change & Continuous Authorization. Company Capability Passport is the sixth pending submission and must be withdrawn from Marketplace review while its private Tool remains protected.

No public Marketplace URL exists yet, so external discovery, cloning, purchase and use cannot be claimed. The internal agent remains a workspace-only demo and is not a substitute for Marketplace publication. Current verdict: `RELEVANCE_PUBLICATION_REVIEW_PENDING`.

Production truth is release `4a545d4fa39fd55400862c5efd096630293ced9c`, MCP Registry identity `io.github.runonproof/cdo@3.0.0`, and remote MCP `https://api.runonproof.com/v1/agent/mcp`. Relevance AI supports connecting that remote MCP, but the MCP Registry does not install it automatically.

## Sources of truth and precedence

When two pages disagree, use this precedence:

1. production runtime coverage and source health at the time of execution;
2. canonical RunOnProof catalog, pricing and API contracts;
3. `authoring-manifest.json` and JSON schemas in this repository;
4. this documentation;
5. screenshots, case copy, and historical reports.

Never infer availability from the presence of a route or an old screenshot. A capability must be currently supported, purchasable when applicable, and healthy enough for the requested decision.

## Status vocabulary

- **Repository implemented**: code, schemas, fixtures, prompt, and documentation exist in Git.
- **Published internally**: the Tool or agent is usable inside the RunOnProof Relevance AI project.
- **Production call**: the Tool sends a request to `api.runonproof.com`.
- **Marketplace submitted**: listing material has entered Relevance review; it is still unavailable to external users.
- **Marketplace published**: the approved listing has a public URL and can be independently found and cloned. This state has not been reached.
- **Payment certified**: one human-approved `0.04 USDC` production purchase, delivery, ledger reconciliation and no-charge replay were externally proven. This state has not been reached.

Do not collapse these into one word such as “live.”
