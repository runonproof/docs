# Install from zero

This guide is for a person who has never used RunOnProof in Relevance AI. It covers the future Marketplace installation path, a direct MCP fallback, and a safe first test that stops before payment.

## Before you start

You need:

- access to a Relevance AI project you are allowed to modify;
- a Relevance AI project where you can add Tools or MCP connections;
- the production MCP URL shown below if the Marketplace listing is not yet approved;
- about 10 minutes for a first safe connection.

You do **not** need a wallet, payer key, payment signature, or RunOnProof secret for the safe synthetic setup. Do not create or paste payment credentials into Relevance AI.

## Know the three environments

- **Synthetic test** uses repository fixtures. It does not contact a real source and costs `0.00 USDC`.
- **Staging** is a RunOnProof engineering environment. Use it only when a documented staging URL and authorization exist for the test.
- **Production** is `https://api.runonproof.com`. A paid POST can return HTTP 402 and may lead to a charge only through a separately authorized x402 payment client. This integration must stop before payment.

If you are unsure which environment you are using, stop and inspect the URL before pressing Run.

## Path A — Marketplace, after approval

1. Open Relevance AI and select **Marketplace**.
2. Search for `RunOnProof` and open the listing published by RunOnProof.
3. Confirm the listing describes the five capabilities, says the listing is free to clone, and separately lists each RunOnProof USDC execution price.
4. Clone or add the Tool to the intended project.
5. Attach only the capabilities you need to a new Agent.
6. Set every economic Tool to **Approval Required**.
7. Run Company Check without a payment signature to obtain the `0.04 USDC` quote. Stop at `REVIEW`.

This path cannot be used while the listing is `pending / Unpublished`.

## Path B — direct remote MCP

1. Open an Agent and go to its Tools section.
2. Choose **Add MCP → Connect my own**.
3. Label the connection `runonproof-production`.
4. Enter `https://api.runonproof.com/v1/agent/mcp`.
5. Confirm the server reports version `3.0.0` and lists the expected Tools.
6. Add only the five intended capabilities to the Agent and require approval for economic execution.

This direct connection is an official Relevance MCP Client feature, but it is not a Marketplace listing and does not provide an x402 wallet.

## Path C — manual development copy

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
- Do not describe a pending submission or direct MCP connection as an approved Marketplace listing.
- Do not claim a Relevance AI partnership.
- Do not use a real company as the first test when a synthetic fixture can prove the contract.

## Existing RunOnProof workspace

The RunOnProof workspace contains eleven Tools: five historical UK aliases, five global target capabilities and Company Capability Passport. Six global Tool listings are under Marketplace review. Avoid creating duplicates. See [Observed workspace evidence](WORKSPACE-EVIDENCE.md) for historical state and `../public-production/README.md` for the current publication state.
