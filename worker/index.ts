/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { allDocSlugs } from "../lib/docs";
import {
  CERTIFIED_API_ORIGIN,
  CERTIFIED_API_SHA,
  isCertifiedUkPublicPath,
  UK_V1_PUBLIC_PATHS,
} from "../lib/uk-public-routes";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const PUBLIC_DOCS_ORIGIN = "https://docs.runonproof.com";

function sitemapResponse(): Response {
  const paths = new Set([
    ...allDocSlugs().map((slug) => slug ? `/docs/${slug}` : "/docs"),
    ...UK_V1_PUBLIC_PATHS,
    "/docs/reference/openapi",
  ]);
  const urls = [...paths].sort().map((path) =>
    `<url><loc>${PUBLIC_DOCS_ORIGIN}${path}</loc></url>`,
  ).join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=300" } },
  );
}

function robotsResponse(): Response {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${PUBLIC_DOCS_ORIGIN}/sitemap.xml\n`, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=300" },
  });
}

function llmsResponse(): Response {
  return new Response(`# RunOnProof\n\n> Evidence-backed, source-scoped business decisions for agents and enterprise systems.\n\n- Documentation: ${PUBLIC_DOCS_ORIGIN}/docs\n- UK V1: ${PUBLIC_DOCS_ORIGIN}/docs/uk/v1\n- Integrations: ${PUBLIC_DOCS_ORIGIN}/docs/integrations\n- MCP: ${PUBLIC_DOCS_ORIGIN}/docs/integrations/mcp\n- Support: ${PUBLIC_DOCS_ORIGIN}/docs/support\n- Privacy: ${PUBLIC_DOCS_ORIGIN}/docs/privacy\n- Terms: ${PUBLIC_DOCS_ORIGIN}/docs/terms\n- OpenAPI: ${CERTIFIED_API_ORIGIN}/v1/openapi.json\n- Catalog: ${CERTIFIED_API_ORIGIN}/v1/catalog\n- Agent Card: ${CERTIFIED_API_ORIGIN}/.well-known/agent-card.json\n- Remote MCP: ${CERTIFIED_API_ORIGIN}/v1/agent/mcp\n\nThe five UK commercial solutions are Company Check, Supplier Approval, Invoice & Payee Verification, Payment Authorization, and Vendor Change & Continuous Authorization. Paid Tools return a bound x402 endpoint and never sign, pay, or settle automatically. HTTP 402 requires review.\n`, {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=300" },
  });
}

async function certifiedUkResponse(request: Request, pathname: string): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
  }

  // Forward only representation headers. Cookies, authorization, x402/payment
  // headers and all other caller state must never reach the API runtime.
  const headers = new Headers();
  headers.set("accept", request.headers.get("accept") ?? "text/html,application/xhtml+xml");
  const language = request.headers.get("accept-language");
  if (language) headers.set("accept-language", language);

  const upstream = await fetch(`${CERTIFIED_API_ORIGIN}${pathname}`, {
    method: request.method,
    headers,
    redirect: "manual",
  });
  const responseHeaders = new Headers();
  for (const name of [
    "content-type",
    "content-language",
    "content-security-policy",
    "cross-origin-resource-policy",
    "referrer-policy",
    "x-content-type-options",
    "x-frame-options",
  ]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }
  responseHeaders.set("cache-control", "no-store, max-age=0");
  responseHeaders.set("x-runonproof-docs-source-sha", CERTIFIED_API_SHA);
  responseHeaders.set("x-runonproof-docs-route", "uk-v1-certified-proxy");

  if (request.method === "HEAD") return new Response(null, { status: upstream.status, headers: responseHeaders });
  const contentType = upstream.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    const html = await upstream.text();
    return new Response(html, { status: upstream.status, headers: responseHeaders });
  }
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") return sitemapResponse();
    if (url.pathname === "/robots.txt") return robotsResponse();
    if (url.pathname === "/llms.txt") return llmsResponse();
    if (isCertifiedUkPublicPath(url.pathname)) return certifiedUkResponse(request, url.pathname);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
