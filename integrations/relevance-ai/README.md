# Relevance AI public integration reference

This directory is the sanitized, public authoring reference for connecting a Relevance AI agent to RunOnProof. It contains no private workspace links, project identifiers, secrets, wallet material, or payment proofs.

Use the files in this order:

1. `authoring-manifest.json` — auditable recipe for the Tool editor; it is not a one-click import.
2. `schemas/tool-input.schema.json` — exact inputs.
3. `runtime.mjs` — deterministic capability selection and fail-closed normalization reference.
4. `schemas/decision-output.schema.json` — normalized output.
5. `SYSTEM-PROMPT.md` — agent instructions.
6. `fixtures/` and `demo.mjs` — seven synthetic scenarios with zero network calls and zero payment attempts.

Run:

```bash
npm run demo:relevance-ai
npm run test:relevance-ai
```

This public export is versioned by `schema_version` in `authoring-manifest.json`. Executable service source and internal test evidence are not included. Runtime catalog, coverage, health, and a newer controlled release take precedence over this snapshot.

Internal Tool publication is not public sharing, Marketplace publication, partnership, or automatic-payment authorization.
