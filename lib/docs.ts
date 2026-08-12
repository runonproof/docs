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
  "": `# Evidence before execution\n\nRunOnProof gives agents narrow company decisions with the evidence, coverage, freshness, and limitations attached. Start with a country pack or open the Relevance AI installation guide.\n\n## Choose a path\n\n- **New to RunOnProof:** read Get started and Decision states.\n- **Building an agent:** open Integrations.\n- **Checking current availability:** read Coverage and Status.\n- **Maintaining a production workflow:** use the Operations guides.`,
  "get-started": `# Get started\n\nBegin read-only. Check current coverage and source health before selecting a product, and prefer replay when a committed execution already answers the question.\n\n## Three rules\n\n1. Name the exact action.\n2. Identify the exact legal company.\n3. Continue only when the evidence supports that action.`,
  catalog: `# Catalog\n\nThe catalog distinguishes active, active-limited, conditioned, and roadmap capabilities. Route presence is not purchase authorization. Read runtime truth before execution.`,
  coverage: `# Coverage\n\nCoverage is a declared boundary: country, source, claim, observation time, and matching scope. Missing coverage never becomes an automatic approval.`,
  status: `# Status\n\nUse runtime status and source-health endpoints for current operational truth. Documentation review dates are not live health timestamps.`,
  changelog: `# Changelog\n\nPublic documentation releases must record the source CDO SHA, public docs SHA, validation date, and any catalog, price, coverage, or integration change.`,
  "countries/br": `# Brazil\n\nThe Brazil portfolio combines technical products, composed solutions, and the Company Capability Passport under explicit evidence, idempotency, replay, and single-charge boundaries.`,
  "countries/uk": `# United Kingdom\n\nThe UK portfolio uses official-source evidence with explicit Companies House and UK Sanctions List limitations. Current runtime coverage and source health control execution.`,
  "countries/us": `# United States\n\nUS federal and state capabilities must be read from their current published status. A blocked or inactive source must not be presented as sellable coverage.`,
  "capabilities/company-check": `# Company Check\n\nCompany Check resolves the legal company and reports scoped status evidence. It does not prove bank ownership, invoice authenticity, solvency, or absence of every risk.`,
  "capabilities/company-passport": `# Company Capability Passport\n\nThe Passport reuses committed, versioned decisions. It is not a universal trust badge and does not make stale evidence current.`,
  "reference/decision-states": `# Decision states\n\n- **PROCEED:** evidence supports the exact action and conditions.\n- **REVIEW:** a person, evidence, source recovery, or approval is required.\n- **STOP:** do not continue.`,
  integrations: `# Integrations\n\nRunOnProof can be delivered through documented APIs and agent channels. Every channel must preserve evidence, uncertainty, approval, idempotency, and cost boundaries.`,
  enterprise: `# Enterprise operations\n\nAdopt in stages: synthetic certification, private integration, source-health validation, controlled production execution, economic reconciliation, and reversible rollout.`,
  demo: `# Synthetic demo\n\nSynthetic fixtures prove the decision contract without representing a live company result. They are the safest first test for every integration.`,
  "reference/api": `# API reference\n\nThe public OpenAPI contract and machine-readable catalog are the integration references. Presence in OpenAPI does not by itself prove availability, sellability, or healthy source coverage.`,
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
