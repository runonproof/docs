# Update guide

Update the integration whenever an endpoint, input, output, product state, price, prompt rule, Relevance AI behavior, or source limitation changes.

## One-change rule

A contract change must update every affected surface in the same pull request:

- canonical runtime/catalog or API contract;
- `authoring-manifest.json`;
- JSON schemas;
- runtime selection/normalization;
- fixtures and tests;
- system prompt;
- capability matrix;
- installation and everyday-use documentation;
- public case and public docs copy when claims change.

Do not update only the prose or only the Tool.

## Endpoint change

1. Confirm the new endpoint is canonical and deployed in the intended environment.
2. Update the manifest and Tool API step.
3. Check method, headers, body, status handling, redirects, and response size.
4. Run all fixtures and contract tests.
5. Publish a new internal Tool version; do not overwrite the last known-good version without a rollback target.
6. Connect a test agent to the new version.
7. Promote only after synthetic certification.

## Price or sellability change

1. Read the canonical pricing/catalog source.
2. Update the manifest, price examples, fixture expectations, capability matrix, and public copy together.
3. Verify the agent displays the new price before approval.
4. Confirm conditioned or non-purchasable items show no sellable price.
5. Never infer price from an old screenshot.

## Input/output contract change

1. Version the schema when compatibility requires it.
2. Preserve old consumers or document the breaking migration.
3. Update Tool inputs and normalization.
4. Add fixtures for missing, invalid, and legacy fields.
5. Verify no sensitive field is newly exposed.

## Prompt change

Treat prompt changes as behavior changes. Test capability selection, price disclosure, approval, decision mapping, prohibited claims, and refusal paths. A shorter prompt is not an improvement if it removes a safety boundary.

## Relevance AI UI or platform change

Use current official Relevance AI documentation. Record the review date in `OFFICIAL-SUPPORT.md`. If timeouts, retries, secret handling, response limits, import, or Marketplace rules remain undocumented, mark them `NOT_DOCUMENTED`; do not guess.

## Release sequence

1. Branch from current `main`.
2. Make the smallest coherent change.
3. Run `npm run demo:relevance-ai` and `npm run test:relevance-ai` plus affected checks.
4. Review links, JSON examples, product names, prices, and secrets.
5. Open a pull request and wait for green checks.
6. Merge through the normal repository policy.
7. Publish a new internal Tool/agent version only when needed.
8. Run safe synthetic workspace QA.
9. Update observed evidence and public copy.

Never publish a higher state than the evidence proves.
