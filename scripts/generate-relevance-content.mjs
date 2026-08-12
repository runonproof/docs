import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const routes = {
  "integrations/relevance-ai": "INDEX.md",
  "integrations/relevance-ai/install": "INSTALL-FROM-ZERO.md",
  "integrations/relevance-ai/create-tool": "CREATE-TOOL.md",
  "integrations/relevance-ai/connect-agent": "CREATE-AND-CONNECT-AGENT.md",
  "integrations/relevance-ai/use": "EVERYDAY-USE.md",
  "integrations/relevance-ai/decisions": "DECISIONS-AND-RESULTS.md",
  "integrations/relevance-ai/pricing-and-approval": "PRICING-402-AND-APPROVAL.md",
  "integrations/relevance-ai/first-purchase": "FIRST-PURCHASE.md",
  "integrations/relevance-ai/security": "SECURITY-AND-DATA.md",
  "integrations/relevance-ai/fixtures": "FIXTURES-AND-EXPECTED-RESULTS.md",
  "integrations/relevance-ai/troubleshooting": "TROUBLESHOOTING.md",
  "integrations/relevance-ai/production": "PRODUCTION-CHECKLIST.md",
  "integrations/relevance-ai/maintenance": "UPDATE-GUIDE.md",
  "integrations/relevance-ai/rollback": "ROLLBACK-AND-REMOVAL.md",
  "integrations/relevance-ai/marketplace": "MARKETPLACE-SUBMISSION-GUIDE.md",
  "integrations/relevance-ai/technical-case": "TECHNICAL-CASE.md",
  "integrations/relevance-ai/case": "PUBLIC-CASE.md"
};

const content = {};
for (const [route, filename] of Object.entries(routes)) {
  content[route] = await readFile(resolve(root, "content/relevance-ai", filename), "utf8");
}

const output = `export const relevanceContent: Record<string, string> = ${JSON.stringify(content, null, 2)};\n`;
const target = resolve(root, "lib/relevance-content.generated.ts");

if (process.argv.includes("--check")) {
  const current = await readFile(target, "utf8");
  if (current !== output) {
    console.error("Generated Relevance AI content is out of date. Run npm run generate:content.");
    process.exit(1);
  }
} else {
  await writeFile(target, output, "utf8");
}
