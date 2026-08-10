# RunOnProof for Relevance AI — documentation index

This directory is the public maintenance source for the RunOnProof Relevance AI integration. It explains how to reproduce a safe development configuration, use it, interpret its output, maintain it, and prepare a truthful public case.

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

For operators and developers:

- [Security and data](SECURITY-AND-DATA.md)
- [Troubleshooting](TROUBLESHOOTING.md)
- [Production checklist](PRODUCTION-CHECKLIST.md)
- [Update guide](UPDATE-GUIDE.md)
- [Rollback and removal](ROLLBACK-AND-REMOVAL.md)
- [Technical case](TECHNICAL-CASE.md)

For communication and future distribution:

- [Public case](PUBLIC-CASE.md)
- [Copy for docs.runonproof.com](PUBLIC-DOCS-COPY.md)
- [Sidebar information architecture](SIDEBAR-INFORMATION-ARCHITECTURE.md)
- [Public repository architecture](PUBLIC-REPOSITORY-ARCHITECTURE.md)
- [Marketplace submission guide](MARKETPLACE-SUBMISSION-GUIDE.md)

## Public evidence state

This repository proves the seven synthetic contract scenarios, including the `gb.solution.company_check.v1` quote boundary at `0.04 USDC`, with zero production calls and zero payment attempts. It does not publish private workspace evidence or claim a Relevance AI Marketplace listing, endorsement, certification, or partnership.

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
- **Marketplace published**: a separate public distribution state that has not been reached.

Do not collapse these into one word such as “live.”
