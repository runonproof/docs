# RunOnProof public documentation

This is the public documentation source for RunOnProof. It provides country coverage, decision concepts, integration manuals, operational guidance, sanitized machine-readable contracts, and reproducible public cases in a navigable website with a complete documentation sidebar.

The public GitHub home is [`runonproof/docs`](https://github.com/runonproof/docs). Executable service source and internal operational evidence are intentionally outside this repository.

## Public/private boundary

This repository may contain sanitized public guides, public contracts, synthetic examples, and site source. It must not contain private workspace URLs, opaque private project identifiers, secrets, payment proofs, credentials, incident records, or protected implementation details.

## Run locally

```bash
npm install
npm run build
npm test
npm run demo:relevance-ai
```

## Documentation structure

- Start, countries, capabilities, integrations, reference, and operations appear in the left navigation.
- Relevance AI has dedicated pages for installation, Tool creation, agent connection, everyday use, decisions, pricing, security, fixtures, troubleshooting, production, maintenance, rollback, public/technical cases, and Marketplace preparation.
- Long pages receive an “On this page” table of contents.
- Mobile users receive an accessible documentation drawer.
- `integrations/relevance-ai/` contains the sanitized public authoring manifest, schemas, deterministic normalization reference, agent prompt, and seven synthetic fixtures.

## Source synchronization

Every public release should record its approved public-contract export version and the public docs SHA deployed to `docs.runonproof.com`. Internal provenance belongs in the private release record, not public Git. Public names, prices, coverage, and claims must be validated against an explicitly allowlisted public contract export. Runtime coverage and health always take precedence over prose.

## Publication state

The source is public in this repository. Publication at `docs.runonproof.com` is a separate controlled deployment and must not be inferred from the existence of this repository. Relevance AI Marketplace submission is also a separate, currently unauthorized step.

The committed hosting manifest deliberately contains no project identifier. An authorized release operator must bind the repository to the intended Site through the controlled hosting lifecycle before deployment; never copy an internal hosting ID into public Git history.
