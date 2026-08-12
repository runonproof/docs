const baseUrl = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const canonicalOrigin = "https://docs.runonproof.com";
const paths = [
  "/docs/uk/v1",
  "/docs/uk/products/resolve-legal-entity",
  "/docs/uk/products/verify-company-legal-status",
  "/docs/uk/products/match-invoice-to-company",
  "/docs/uk/products/match-business-payee",
  "/docs/uk/products/approve-supplier",
  "/docs/uk/products/authorise-vendor-payment-detail-change",
  "/docs/uk/products/authorise-business-payment",
  "/docs/uk/solutions/company-check",
  "/docs/uk/solutions/supplier-approval",
  "/docs/uk/solutions/invoice-payee-verification",
  "/docs/uk/solutions/payment-authorisation",
  "/docs/uk/solutions/vendor-change-continuous-authorisation",
  "/docs/uk/passport/company-capability-passport",
];

const fail = (message) => { throw new Error(message); };
const rows = [];
const internalLinks = new Set();
let indexHtml = "";

for (const path of paths) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  const html = await response.text();
  if (response.status !== 200) fail(`${path}: HTTP ${response.status}`);
  if (!html.includes(`<link rel="canonical" href="${canonicalOrigin}${path}">`)) fail(`${path}: canonical mismatch`);
  if (/https?:\/\/[^\s"']*staging|localhost|cdo-production\.up\.railway\.app/i.test(html)) fail(`${path}: forbidden hostname or environment marker`);
  if (path !== "/docs/uk/v1" && !html.includes("https://api.runonproof.com")) fail(`${path}: api.runonproof.com link missing`);
  if (path === "/docs/uk/v1") indexHtml = html;
  for (const match of html.matchAll(/href="(\/docs[^"#?]*)/g)) internalLinks.add(match[1]);
  rows.push({ path, status: response.status, canonical: `${canonicalOrigin}${path}` });
}

for (const path of paths.slice(1)) {
  if (!indexHtml.includes(`href="${path}"`)) fail(`/docs/uk/v1: navigation link missing for ${path}`);
}

for (const path of internalLinks) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  if (response.status !== 200) fail(`internal link ${path}: HTTP ${response.status}`);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`, { redirect: "manual" });
const sitemap = await sitemapResponse.text();
if (sitemapResponse.status !== 200) fail(`/sitemap.xml: HTTP ${sitemapResponse.status}`);
for (const path of paths) {
  if (!sitemap.includes(`<loc>${canonicalOrigin}${path}</loc>`)) fail(`/sitemap.xml: missing ${path}`);
}

const passport = await (await fetch(`${baseUrl}/docs/uk/passport/company-capability-passport`)).text();
if (!/Not sold through x402/i.test(passport) || !/no quote, settlement or charge/i.test(passport)) {
  fail("Passport: technical/no-charge boundary missing");
}

console.log(JSON.stringify({ verdict: "PASS", base_url: baseUrl, pages: rows, internal_links_checked: internalLinks.size }, null, 2));
