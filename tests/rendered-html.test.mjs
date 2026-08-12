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

test("preserves Brazil, United States, catalog and global documentation routes", async () => {
  for (const route of [
    "/docs",
    "/docs/catalog",
    "/docs/coverage",
    "/docs/countries/br",
    "/docs/countries/us",
    "/docs/capabilities/company-check",
    "/docs/capabilities/company-passport",
  ]) {
    const response = await fetchPage(route);
    assert.equal(response.status, 200, route);
    assert.match(await response.text(), /RunOnProof/);
  }
});

test("publishes the UK V1 sitemap without removing existing documentation", async () => {
  const response = await fetchPage("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/xml\b/i);
  const xml = await response.text();
  for (const path of [
    "/docs",
    "/docs/countries/br",
    "/docs/countries/us",
    "/docs/integrations/relevance-ai",
    "/docs/uk/v1",
    "/docs/uk/products/resolve-legal-entity",
    "/docs/uk/solutions/payment-authorisation",
    "/docs/uk/passport/company-capability-passport",
  ]) {
    assert.match(xml, new RegExp(`https://docs\\.runonproof\\.com${path}`));
  }
});

test("proxies only the certified UK allowlist and strips caller authority", async () => {
  const originalFetch = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (input, init) => {
    seen.push({ input: String(input), init });
    return new Response(
      '<!doctype html><link rel="canonical" href="https://docs.runonproof.com/docs/uk/v1"><a href="https://cdo-production.up.railway.app/v1/gb/coverage">coverage</a>',
      { status: 200, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  };
  try {
    const response = await worker.fetch(
      new Request("http://localhost/docs/uk/v1", {
        headers: {
          authorization: "Bearer must-not-forward",
          cookie: "must-not-forward=1",
          "payment-signature": "must-not-forward",
          "x-payment": "must-not-forward",
        },
      }),
      { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-runonproof-docs-source-sha"), "f640afe35f040653815b3e7e5673e31ed4ab036a");
    assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
    const html = await response.text();
    assert.match(html, /https:\/\/api\.runonproof\.com\/v1\/gb\/coverage/);
    assert.doesNotMatch(html, /cdo-production\.up\.railway\.app/);
    assert.equal(seen.length, 1);
    assert.equal(seen[0].input, "https://api.runonproof.com/docs/uk/v1");
    const forwarded = new Headers(seen[0].init.headers);
    assert.equal(forwarded.get("authorization"), null);
    assert.equal(forwarded.get("cookie"), null);
    assert.equal(forwarded.get("payment-signature"), null);
    assert.equal(forwarded.get("x-payment"), null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
