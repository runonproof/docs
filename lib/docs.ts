import { marked } from "marked";
import { relevanceContent } from "./relevance-content.generated";

export type NavItem = { title: string; slug: string; children?: NavItem[] };
export type NavGroup = { label: string; items: NavItem[] };

export const navGroups: NavGroup[] = [
  {
    label: "Start",
    items: [
      { title: "Overview", slug: "" },
      { title: "Get started", slug: "get-started" },
      { title: "Catalog", slug: "catalog" },
      { title: "Coverage", slug: "coverage" },
      { title: "Status", slug: "status" },
      { title: "Changelog", slug: "changelog" },
      { title: "Support", slug: "support" },
      { title: "Privacy", slug: "privacy" },
      { title: "Terms", slug: "terms" },
    ],
  },
  {
    label: "Countries",
    items: [
      { title: "Brazil", slug: "countries/br" },
      { title: "United Kingdom", slug: "countries/uk" },
      { title: "United States", slug: "countries/us" },
    ],
  },
  {
    label: "Autonomous agents",
    items: [
      {
        title: "Agent-first overview",
        slug: "agent-first",
        children: [
          { title: "Free Agent ID", slug: "agent-first/agent-id" },
          { title: "Company Check", slug: "agent-first/company-check" },
          { title: "Supplier Approval", slug: "agent-first/supplier-approval" },
          { title: "Invoice & Payee", slug: "agent-first/invoice-payee-verification" },
          { title: "Payment Authorization", slug: "agent-first/payment-authorization" },
          { title: "Vendor Continuity", slug: "agent-first/vendor-change-continuous-authorization" },
        ],
      },
    ],
  },
  {
    label: "Capabilities",
    items: [
      { title: "Company Check", slug: "capabilities/company-check" },
      { title: "Company Passport", slug: "capabilities/company-passport" },
      { title: "Decision states", slug: "reference/decision-states" },
    ],
  },
  {
    label: "Integrations",
    items: [
      { title: "Overview", slug: "integrations" },
      { title: "MCP", slug: "integrations/mcp" },
      { title: "n8n", slug: "integrations/n8n" },
      { title: "Make", slug: "integrations/make" },
      { title: "Zapier", slug: "integrations/zapier" },
      {
        title: "Relevance AI",
        slug: "integrations/relevance-ai",
        children: [
          { title: "Install from zero", slug: "integrations/relevance-ai/install" },
          { title: "Create the Tool", slug: "integrations/relevance-ai/create-tool" },
          { title: "Connect the agent", slug: "integrations/relevance-ai/connect-agent" },
          { title: "Everyday use", slug: "integrations/relevance-ai/use" },
          { title: "Decisions & results", slug: "integrations/relevance-ai/decisions" },
          { title: "Pricing & approval", slug: "integrations/relevance-ai/pricing-and-approval" },
          { title: "First purchase", slug: "integrations/relevance-ai/first-purchase" },
          { title: "Security & data", slug: "integrations/relevance-ai/security" },
          { title: "Seven fixtures", slug: "integrations/relevance-ai/fixtures" },
          { title: "Troubleshooting", slug: "integrations/relevance-ai/troubleshooting" },
          { title: "Production checklist", slug: "integrations/relevance-ai/production" },
          { title: "Maintenance", slug: "integrations/relevance-ai/maintenance" },
          { title: "Rollback", slug: "integrations/relevance-ai/rollback" },
          { title: "Public case", slug: "integrations/relevance-ai/case" },
          { title: "Technical case", slug: "integrations/relevance-ai/technical-case" },
          { title: "Marketplace guide", slug: "integrations/relevance-ai/marketplace" },
        ],
      },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Enterprise", slug: "enterprise" },
      { title: "Synthetic demo", slug: "demo" },
      { title: "API reference", slug: "reference/api" },
    ],
  },
];

const coreContent: Record<string, string> = {
  "": `# Evidence before execution\n\nRunOnProof gives autonomous agents narrow company decisions with the evidence, coverage, freshness, authority, budget, and limitations attached. Start with Agent-first overview, a country pack, or an integration guide.\n\n## Choose a path\n\n- **Building an autonomous agent:** begin with Agent-first overview and the complete intent taxonomy.\n- **New to RunOnProof:** read Get started and Decision states.\n- **Connecting a framework:** open Integrations.\n- **Checking current availability:** read Coverage and Status.\n- **Maintaining a production workflow:** use the Operations guides.`,
  "get-started": `# Get started\n\nBegin read-only. Check current coverage and source health before selecting a product, and prefer replay when a committed execution already answers the question.\n\n## Three rules\n\n1. Name the exact action.\n2. Identify the exact legal company.\n3. Continue only when the evidence supports that action.`,
  catalog: `# Catalog\n\nThe catalog distinguishes active, active-limited, conditioned, and roadmap capabilities. The US federal agent-first portfolio contains five commercial solutions compiled into six paid x402 operations with an exact combined price of 0.79 USDC. Agent ID and Company Capability Passport are free; Passport is never an economic product. Route presence is not purchase authorization. Read runtime truth before execution.`,
  coverage: `# Coverage\n\nCoverage is a declared boundary: country, source, claim, observation time, and matching scope. The active US agent-first portfolio is **FEDERAL_ONLY** and does not establish state registration, legal existence, state good standing, bank-account ownership, invoice authenticity, or OFAC 50 Percent Rule coverage. Missing coverage never becomes an automatic approval.`,
  status: `# Status\n\nUse runtime status and source-health endpoints for current operational truth. The agent-first status endpoint, source health, release identity, and economic controls take precedence over documentation review dates. External registry presence must be independently verified and is never inferred from runtime metadata.`,
  changelog: `# Changelog\n\n## 2026-08-24 — Agent-first AMF1-8\n\nPublished the autonomous-agent intent map, five-solution/six-operation US federal portfolio, exact 0.79 USDC economics, free Agent ID and Passport boundaries, MCP Registry identity 3.1.0, ARD/A2A/OpenAPI/MCP/x402 discovery links, and negative-selection rules. Public pages are bound to certified runtime SHA \`fabd5b9f1d288c92a0712ce7a6131c7f5e3974f2\`.\n\nPublic documentation releases must record the approved runtime SHA, public docs SHA, validation date, and any catalog, price, coverage, or integration change.`,
  support: `# Support\n\nFor product, integration, publication, or security questions, contact [institucional@aureumone.io](mailto:institucional@aureumone.io). Include the RunOnProof product ID, request ID, timestamp, and channel. Never include wallet keys, payment signatures, access tokens, or raw bank details.\n\n## Before contacting support\n\n1. Check current runtime coverage and source health.\n2. Preserve the exact HTTP status, public reason codes, and non-secret response metadata.\n3. For HTTP 402, do not retry with payment automatically; review the bound quote first.`,
  privacy: `# Privacy\n\nRunOnProof processes the minimum request inputs needed to return an evidence-backed, source-scoped decision, support idempotency and replay, and maintain security and operational records.\n\n## Data boundaries\n\n- Never submit wallet private keys, seed phrases, reusable payment credentials, access tokens, or raw bank-account details.\n- Use opaque payee fingerprints and the minimum caller evidence required by the selected contract.\n- Public Passport verification is privacy-minimised; private lifecycle operations require an authorised operator.\n- Automations must redact credentials and payment material from logs and exported evidence.\n\nQuestions and requests may be sent to [institucional@aureumone.io](mailto:institucional@aureumone.io) with the relevant request ID and jurisdiction, but without secret material.`,
  terms: `# Terms of use\n\nRunOnProof provides source-scoped decision infrastructure. Each response, catalogue record, and integration declares its product ID, jurisdiction, source coverage, freshness, limitations, and machine action. Those declarations are the operational boundary of use.\n\n## Required controls\n\n- Do not treat a listing, HTTP 200 response, or no-match as broader certification, good standing, safety, or worldwide clearance.\n- Stop or route to human review on REVIEW, HOLD, RETRY, UNKNOWN, NO_DECISION, stale evidence, or unavailable required sources.\n- Do not automate an x402 payment from an HTTP 402 response. Payment requires separately authorised review of the exact quote.\n- Do not misuse the service, probe for secrets, evade idempotency or source limits, or represent RunOnProof evidence as a government endorsement.\n\nChannel-specific marketplace terms and an agreed enterprise contract may add obligations. Questions may be sent to [institucional@aureumone.io](mailto:institucional@aureumone.io).`,
  "countries/br": `# Brazil\n\nThe Brazil portfolio combines technical products, composed solutions, and the Company Capability Passport under explicit evidence, idempotency, replay, and single-charge boundaries.`,
  "countries/uk": `# United Kingdom\n\nThe UK portfolio uses official-source evidence with explicit Companies House and UK Sanctions List limitations. Current runtime coverage and source health control execution.`,
  "countries/us": `# United States\n\nThe active autonomous-agent portfolio is **FEDERAL_ONLY**: five commercial solutions, six paid x402 operations, and an exact combined price of 0.79 USDC on Base. Agent ID and Company Capability Passport are free, and Passport is not a commercial solution or paid product.\n\nThe portfolio uses named federal datasets only. It does not establish state registration, legal existence, state good standing, bank-account ownership, invoice authenticity, or OFAC 50 Percent Rule coverage. Missing, stale, incomplete, unavailable, quarantined, or unconsulted required evidence produces an explicit stop or retry without charge.`,
  "agent-first": `# Agent-first RunOnProof\n\nThe customer, discovery actor, selector, caller, recipient, and return consumer are autonomous agents. A payer may be an autonomous agent only when it holds independently delegated authority and budget.\n\n## Canonical portfolio\n\n- **Agent ID:** free self-controlled key identity; not trust, employment, legal representation, or payment authority.\n- **Five commercial solutions:** Company Check, Supplier Approval, Invoice & Payee Verification, Payment Authorization, and Vendor Change & Continuous Authorization.\n- **Six paid operations:** 0.04, 0.20, 0.10, 0.20, 0.15, and 0.10 USDC; exact total 0.79 USDC.\n- **Company Capability Passport:** free proof and reuse companion, never an economic product.\n\n## Machine discovery\n\n- [Complete intent taxonomy](https://api.runonproof.com/.well-known/runonproof-intents.json)\n- [ARD AI catalog](https://api.runonproof.com/.well-known/ai-catalog.json)\n- [A2A Agent Card](https://api.runonproof.com/.well-known/agent-card.json)\n- [MCP server card](https://api.runonproof.com/.well-known/mcp/server-card.json)\n- [Agent map](https://api.runonproof.com/.well-known/agent-map.json)\n- [OpenAPI](https://api.runonproof.com/v1/openapi.json)\n- [Exact x402 resources](https://api.runonproof.com/v1/agent-mode/x402-resources)\n- [MCP endpoint](https://api.runonproof.com/v1/agent/mcp)\n\n## Negative selection\n\nUnsupported coverage, insufficient authority or budget, valid reusable evidence, unavailable mandatory sources, and unimplemented intents return an explicit stop, precondition, retry, or alternative. Discovery never creates demand, signs a payment, settles, or broadens a claim.`,
  "agent-first/agent-id": `# Free Agent ID\n\nAgent ID is a free self-controlled Ed25519 key identity foundation. It proves key possession only and never proves trust, employment, legal representation, company affiliation, budget, or payment authority. It is not one of the five commercial solutions and has no x402 price.`,
  "agent-first/company-check": `# Company Check\n\nAn autonomous agent selects Company Check when legal status or federal counterparty evidence is needed before a bounded business action. The paid US operation is \`us.company.check.v1\` at 0.04 USDC. Coverage is FEDERAL_ONLY and required-source uncertainty stops decision and charge.`,
  "agent-first/supplier-approval": `# Supplier Approval\n\nAn autonomous procurement agent selects Supplier Approval for a supplier candidate or policy decision. The paid US operation is \`us.supplier.approve.v1\` at 0.20 USDC. The result remains source-scoped and never establishes state good standing or universal safety.`,
  "agent-first/invoice-payee-verification": `# Invoice & Payee Verification\n\nAn autonomous accounts-payable agent selects this solution when invoice and payee details conflict or require verification. The paid US operation is \`us.invoice_payee.verify.v1\` at 0.10 USDC. It does not prove invoice authenticity, bank-account ownership, or absence of every fraud risk.`,
  "agent-first/payment-authorization": `# Payment Authorization\n\nAn autonomous treasury agent selects Payment Authorization before releasing a business payment. The paid US operation is \`us.payment.authorize.v1\` at 0.20 USDC. Evidence support is not delegated signing authority; the MCP server never signs, pays, or settles.`,
  "agent-first/vendor-change-continuous-authorization": `# Vendor Change & Continuous Authorization\n\nAn autonomous vendor-operations agent uses two bounded operations: \`us.vendor.payment_detail_change.authorize.v1\` at 0.15 USDC and \`us.vendor.authorization.continue.v1\` at 0.10 USDC. A change or continuation request never bypasses authority, budget, source health, idempotency, or negative selection.`,
  "capabilities/company-check": `# Company Check\n\nCompany Check resolves the legal company and reports scoped status evidence. It does not prove bank ownership, invoice authenticity, solvency, or absence of every risk.`,
  "capabilities/company-passport": `# Company Capability Passport\n\nThe Passport reuses committed, versioned decisions. It is not a universal trust badge and does not make stale evidence current.`,
  "reference/decision-states": `# Decision states\n\n- **PROCEED:** evidence supports the exact action and conditions.\n- **REVIEW:** a person, evidence, source recovery, or approval is required.\n- **STOP:** do not continue.`,
  integrations: `# Integrations\n\nRunOnProof can be delivered through documented APIs and agent channels. Every channel must preserve evidence, uncertainty, approval, idempotency, and cost boundaries.`,
  "integrations/mcp": `# RunOnProof MCP\n\nThe public Streamable HTTP server is \`https://api.runonproof.com/v1/agent/mcp\`. The official Registry identity is \`io.github.runonproof/cdo@3.1.0\`.\n\nUse \`initialize\`, \`notifications/initialized\`, \`tools/list\`, \`resources/read\`, and \`tools/call\` on the same endpoint. The free resolver maps canonical intents and problem states to supported routes. Exactly six US paid Tools return bound canonical x402 resource URLs with a combined price of 0.79 USDC; Agent ID and Passport remain free. The MCP server never signs, pays, settles, or retries automatically.`,
  "integrations/n8n": `# RunOnProof for n8n\n\nThe certified package source contains one RunOnProof node, five UK workflows, and a common decision subworkflow. It preserves PROCEED, REVIEW, STOP, and UNKNOWN, maps HTTP 402 to REVIEW, and contains no wallet or automatic payment path.\n\nThe npm package is \`n8n-nodes-runonproof@0.2.0\`. Registry installation counts as available only after the exact package is publicly published and independently installed; a local tarball is not a public release.`,
  "integrations/make": `# RunOnProof for Make\n\nThe authenticated-QA bundle contains one private app definition, a bounded connection, five modules, and five unscheduled blueprints. Connections must use \`https://api.runonproof.com\`. HTTP 402 becomes REVIEW and no module signs or pays.\n\nA source bundle or private app does not count as Marketplace publication. Public availability begins only after Make account import, DevTool QA, review submission, approval, and external installation evidence.`,
  "integrations/zapier": `# RunOnProof for Zapier\n\nZapier app \`244981\`, version \`1.0.1\`, exposes five synchronous RunOnProof UK Actions. It has no triggers, wallet, automatic payment, automatic settlement, or economic retry. HTTP 402 becomes REVIEW and blocks continuation.\n\nThe integration remains private until Zapier's publishing review is submitted and approved. Public-intent configuration is not the same as publication or App Directory discovery.`,
  enterprise: `# Enterprise operations\n\nAdopt in stages: synthetic certification, private integration, source-health validation, controlled production execution, economic reconciliation, and reversible rollout.`,
  demo: `# Synthetic demo\n\nSynthetic fixtures prove the decision contract without representing a live company result. They are the safest first test for every integration.`,
  "reference/api": `# API reference\n\nThe public [OpenAPI contract](https://api.runonproof.com/v1/openapi.json), [complete intent taxonomy](https://api.runonproof.com/.well-known/runonproof-intents.json), [ARD catalog](https://api.runonproof.com/.well-known/ai-catalog.json), [A2A Agent Card](https://api.runonproof.com/.well-known/agent-card.json), and [exact x402 resources](https://api.runonproof.com/v1/agent-mode/x402-resources) are the machine integration references. Presence in a descriptor does not by itself prove external indexing, purchase authority, sellability, successful execution, or healthy source coverage.`,
};

export type DocPage = {
  slug: string;
  title: string;
  eyebrow: string;
  markdown: string;
};

const titleFromMarkdown = (markdown: string) =>
  markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "Documentation";

const relevanceFileRoutes: Record<string, string> = {
  "INDEX.md": "integrations/relevance-ai",
  "INSTALL-FROM-ZERO.md": "integrations/relevance-ai/install",
  "CREATE-TOOL.md": "integrations/relevance-ai/create-tool",
  "CREATE-AND-CONNECT-AGENT.md": "integrations/relevance-ai/connect-agent",
  "EVERYDAY-USE.md": "integrations/relevance-ai/use",
  "DECISIONS-AND-RESULTS.md": "integrations/relevance-ai/decisions",
  "PRICING-402-AND-APPROVAL.md": "integrations/relevance-ai/pricing-and-approval",
  "FIRST-PURCHASE.md": "integrations/relevance-ai/first-purchase",
  "SECURITY-AND-DATA.md": "integrations/relevance-ai/security",
  "FIXTURES-AND-EXPECTED-RESULTS.md": "integrations/relevance-ai/fixtures",
  "TROUBLESHOOTING.md": "integrations/relevance-ai/troubleshooting",
  "PRODUCTION-CHECKLIST.md": "integrations/relevance-ai/production",
  "UPDATE-GUIDE.md": "integrations/relevance-ai/maintenance",
  "ROLLBACK-AND-REMOVAL.md": "integrations/relevance-ai/rollback",
  "MARKETPLACE-SUBMISSION-GUIDE.md": "integrations/relevance-ai/marketplace",
  "TECHNICAL-CASE.md": "integrations/relevance-ai/technical-case",
  "PUBLIC-CASE.md": "integrations/relevance-ai/case",
};

const publicLinks = (markdown: string) => markdown.replace(
  /\(([^/)]+\.md)(#[^)]+)?\)/g,
  (whole, file: string, hash = "") => relevanceFileRoutes[file] ? `(/docs/${relevanceFileRoutes[file]}${hash})` : whole,
);

export function getDocPage(slug: string): DocPage | null {
  const markdown = relevanceContent[slug] ?? coreContent[slug];
  if (!markdown) return null;
  return {
    slug,
    title: titleFromMarkdown(markdown),
    eyebrow: slug.startsWith("integrations/relevance-ai")
      ? "Integration · Relevance AI"
      : "RunOnProof documentation",
    markdown: slug.startsWith("integrations/relevance-ai") ? publicLinks(markdown) : markdown,
  };
}

export function renderMarkdown(markdown: string) {
  let html = marked.parse(markdown, { async: false, gfm: true }) as string;
  const toc: Array<{ id: string; text: string; level: number }> = [];
  const used = new Map<string, number>();
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, depth, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
    const base = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    toc.push({ id, text, level: Number(depth) });
    return `<h${depth} id="${id}">${inner}</h${depth}>`;
  });
  return { html, toc };
}

export function allDocSlugs() {
  return navGroups.flatMap((group) =>
    group.items.flatMap((item) => [item.slug, ...(item.children?.map((child) => child.slug) ?? [])]),
  );
}
