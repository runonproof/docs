# Create and connect a RunOnProof agent

The agent explains what the user wants, chooses whether the Tool is appropriate, asks for missing information, and interprets the normalized response. It must not invent evidence or silently approve payment.

## Create the agent

1. Open **Agents** in the Relevance AI project.
2. Choose **Create Agent** or **New Agent**.
3. Select a blank or start-from-scratch option.
4. Name it `RunOnProof` or a task-specific name such as `RunOnProof Company Check`.
5. Copy the complete contents of `../SYSTEM-PROMPT.md` into the agent instructions.
6. Save the draft.

Do not shorten the safety rules merely to make the prompt look cleaner. In particular, preserve coverage checks, price disclosure, approval, idempotency, source-health handling, and prohibited claims.

## Connect the five-capability product

1. Open the agent editor.
2. Find **Tools**, **Connected resources**, or the equivalent resource panel.
3. Choose **Add Tool**.
4. After Marketplace approval, select only the RunOnProof capabilities the agent needs. Start with `RunOnProof Company Check`; do not attach Company Capability Passport to the public agent.
5. Allow the agent to fill business inputs only where the interface says **Let agent decide**.
6. Do not let the agent decide whether approval is required. The execution policy itself must remain **Requires approval**.
7. Do not connect a wallet or payment Tool.
8. Save and publish the agent inside the project. Public Agent sharing is a separate action from Tool Marketplace approval.

Alternatively choose **Add MCP → Connect my own** and enter `https://api.runonproof.com/v1/agent/mcp`. The MCP connection exposes the certified production server, but it does not install Marketplace listings or add a wallet.

## Verify the connection

In the agent editor, confirm:

- the exact Tool name appears in the connected list;
- the published Tool version is selected;
- execution requires approval;
- automatic retry is disabled for the paid POST;
- no secret or payment credential appears in visible instructions;
- no claim of Marketplace availability is shown until an approved public URL exists.

## First conversation

Use a safe prompt such as:

> Explain how you would verify UK company 01234567. Show the product and price, but do not pay or execute a production verification.

Expected behavior:

1. The agent identifies Company Check as the smallest capability.
2. It identifies `gb.solution.company_check.v1` and `0.04 USDC`.
3. It does not describe HTTP 402 as a completed payment.
4. It stops for approval before any economic action.
5. It does not claim the company is safe merely from the number.

Then use the repository fixtures described in the fixture guide. Do not use a real company to test an error path that a synthetic fixture already covers.

## When not to connect this Tool

Do not attach the Tool to an agent whose instructions require it to:

- pay automatically;
- treat no sanctions match as universal clearance;
- prove bank ownership, tax registration, invoice authenticity, universal licensing, solvency, or complete beneficial ownership;
- retry paid requests with new idempotency keys;
- continue when evidence is missing or sources are unhealthy.

Those behaviors conflict with the RunOnProof contract.
