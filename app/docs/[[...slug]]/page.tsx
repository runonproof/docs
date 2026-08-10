import { notFound } from "next/navigation";
import { DocsShell } from "../../../components/docs-shell";
import { allDocSlugs, getDocPage, navGroups, renderMarkdown } from "../../../lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return allDocSlugs().map((slug) => ({ slug: slug ? slug.split("/") : [] }));
}

export default async function DocumentationPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const value = await params;
  const slug = value.slug?.join("/") ?? "";
  const page = getDocPage(slug);
  if (!page) notFound();
  const { html, toc } = renderMarkdown(page.markdown);
  return <DocsShell currentSlug={slug} title={page.title} eyebrow={page.eyebrow} html={html} toc={toc} groups={navGroups} />;
}
