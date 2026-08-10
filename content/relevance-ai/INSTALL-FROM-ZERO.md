# Install from zero

This guide is for a person who has never built a Relevance AI Tool. The goal is to create a safe development copy of the RunOnProof Tool and connect it to a test agent without paying RunOnProof or calling a paid production verification.

## Before you start

You need:

- access to a Relevance AI project you are allowed to modify;
- access to this repository;
- the files `authoring-manifest.json`, `schemas/tool-input.schema.json`, `runtime.mjs`, and `SYSTEM-PROMPT.md`;
- about 20–30 minutes for a first installation.

You do **not** need a wallet, payer key, payment signature, or RunOnProof secret for the safe synthetic setup. Do not create or paste payment credentials into Relevance AI.

## Know the three environments

- **Synthetic test** uses repository fixtures. It does not contact a real source and costs `0.00 USDC`.
- **Staging** is a RunOnProof engineering environment. Use it only when a documented staging URL and authorization exist for the test.
- **Production** is `https://api.runonproof.com`. A paid POST can return HTTP 402 and may lead to a charge only through a separately authorized x402 payment client. This integration must stop before payment.

If you are unsure which environment you are using, stop and inspect the URL before pressing Run.

## Installation sequence

1. Open [Relevance AI](https://app.relevanceai.com/) and sign in.
2. Open a development project. Do not begin in a shared production project.
3. Open **Tools**.
4. Select **New Tool** and choose **Start from scratch**. Button labels can change; if the interface differs, choose the option that creates an empty custom Tool rather than a template.
5. Build the Tool by following [Create the Tool](CREATE-TOOL.md).
6. Test the Tool with the synthetic cases before connecting it to an agent.
7. Open **Agents**, create a blank agent, and follow [Create and connect the agent](CREATE-AND-CONNECT-AGENT.md).
8. Confirm the Tool execution policy says **Requires approval**.
9. Run the seven cases in [Fixtures and expected results](FIXTURES-AND-EXPECTED-RESULTS.md).
10. Record the Tool version, agent version, project, test date, and tester. Do not record secrets.

## How to know installation succeeded

The installation is successful only when all of these are true:

- the Tool appears in the project Tool list;
- the agent lists the Tool under its connected resources or tools;
- the Tool requires approval before execution;
- there is no wallet, payer key, `PAYMENT-SIGNATURE`, cookie, or reusable payment proof in the Tool;
- the `payment-required` fixture returns `REVIEW` and shows the product and price;
- conditioned capabilities stop before HTTP;
- a source outage does not become `PROCEED`;
- replay is described as no-new-source-call and no-new-charge;
- the test history shows no unintended production POST or settlement.

## Do not do these things

- Do not paste an API key into a prompt, fixture, URL, screenshot, or chat.
- Do not enable automatic retry for a paid POST.
- Do not turn HTTP 402 into a successful result.
- Do not publish the Tool or agent publicly as part of installation.
- Do not claim a Relevance AI partnership.
- Do not use a real company as the first test when a synthetic fixture can prove the contract.

## Existing installations

Before creating a Tool, check your own project for an existing version. Avoid duplicates; recreate only for isolated training, disaster recovery, or a deliberately versioned replacement. This public repository does not expose RunOnProof's private workspace identifiers or links.
