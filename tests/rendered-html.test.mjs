import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const fetchPage = (path) => worker.fetch(
  new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

test("renders the documentation shell and metadata", async () => {
  const response = await fetchPage("/docs");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /aria-label="Documentation"/);
  assert.match(html, /Documentation menu/);
  assert.match(html, /Evidence before execution/);
});

test("publishes every Relevance AI subpage in the sidebar", async () => {
  const routes = [
    "/docs/integrations/relevance-ai",
    "/docs/integrations/relevance-ai/install",
    "/docs/integrations/relevance-ai/create-tool",
    "/docs/integrations/relevance-ai/connect-agent",
    "/docs/integrations/relevance-ai/use",
    "/docs/integrations/relevance-ai/decisions",
    "/docs/integrations/relevance-ai/pricing-and-approval",
    "/docs/integrations/relevance-ai/first-purchase",
    "/docs/integrations/relevance-ai/security",
    "/docs/integrations/relevance-ai/fixtures",
    "/docs/integrations/relevance-ai/troubleshooting",
    "/docs/integrations/relevance-ai/production",
    "/docs/integrations/relevance-ai/maintenance",
    "/docs/integrations/relevance-ai/rollback",
    "/docs/integrations/relevance-ai/case",
    "/docs/integrations/relevance-ai/technical-case",
    "/docs/integrations/relevance-ai/marketplace",
  ];
  for (const route of routes) {
    const response = await fetchPage(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, /RunOnProof/);
    assert.doesNotMatch(html, /app\.relevanceai\.com\/(agents|notebook)/);
  }
});
