export const CERTIFIED_API_ORIGIN = "https://api.runonproof.com";
export const CERTIFIED_API_SHA = "f640afe35f040653815b3e7e5673e31ed4ab036a";

export const UK_V1_PUBLIC_PATHS = Object.freeze([
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
] as const);

export const UK_SUPPORT_PATHS = Object.freeze([
  "/docs/reference/openapi",
  "/docs/data/uk.json",
] as const);

const proxiedPaths = new Set<string>([...UK_V1_PUBLIC_PATHS, ...UK_SUPPORT_PATHS]);

export function isCertifiedUkPublicPath(pathname: string): boolean {
  return proxiedPaths.has(pathname);
}
