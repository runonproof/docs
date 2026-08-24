export const AGENT_FIRST_CERTIFIED_API_SHA = "fabd5b9f1d288c92a0712ce7a6131c7f5e3974f2";

export const AGENT_FIRST_PUBLIC_PATHS = Object.freeze([
  "/docs/agent-first",
  "/docs/agent-first/agent-id",
  "/docs/agent-first/company-check",
  "/docs/agent-first/supplier-approval",
  "/docs/agent-first/invoice-payee-verification",
  "/docs/agent-first/payment-authorization",
  "/docs/agent-first/vendor-change-continuous-authorization",
  "/docs/data/agent-intents.json",
  "/docs/data/agent-x402-resources.json",
  "/docs/data/agent-external-indexes.json",
] as const);

const agentFirstPaths = new Set<string>(AGENT_FIRST_PUBLIC_PATHS);

export function isCertifiedAgentFirstPublicPath(pathname: string): boolean {
  return agentFirstPaths.has(pathname);
}
