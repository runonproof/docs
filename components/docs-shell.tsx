"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavGroup } from "../lib/docs";

type TocItem = { id: string; text: string; level: number };

const hrefFor = (slug: string) => (slug ? `/docs/${slug}` : "/docs");

export function DocsShell({
  currentSlug,
  title,
  eyebrow,
  html,
  toc,
  groups,
}: {
  currentSlug: string;
  title: string;
  eyebrow: string;
  html: string;
  toc: TocItem[];
  groups: NavGroup[];
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="docs-frame">
      <a className="skip-link" href="#doc-content">Skip to content</a>
      <header className="topbar">
        <Link href="/docs" className="brand" aria-label="RunOnProof documentation home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>RunOnProof</span><b>Docs</b>
        </Link>
        <div className="topbar-status"><span>Evidence first</span><i />Scoped decisions</div>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="docs-sidebar" onClick={() => setOpen(!open)}>
          <span aria-hidden="true">☰</span> Documentation menu
        </button>
      </header>

      {open && <button className="scrim" aria-label="Close documentation menu" onClick={() => setOpen(false)} />}
      <aside id="docs-sidebar" className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="sidebar-intro"><span>Developer guide</span><strong>Browse documentation</strong></div>
        <nav aria-label="Documentation">
          {groups.map((group) => (
            <section className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const active = item.slug === currentSlug;
                const childActive = item.children?.some((child) => child.slug === currentSlug);
                return (
                  <div className={`nav-item-wrap ${childActive ? "child-active" : ""}`} key={item.slug || "home"}>
                    <Link className={active ? "active" : ""} aria-current={active ? "page" : undefined} href={hrefFor(item.slug)} onClick={() => setOpen(false)}>{item.title}</Link>
                    {item.children && (childActive || active) && (
                      <div className="nav-children">
                        {item.children.map((child) => {
                          const selected = child.slug === currentSlug;
                          return <Link key={child.slug} className={selected ? "active" : ""} aria-current={selected ? "page" : undefined} href={hrefFor(child.slug)} onClick={() => setOpen(false)}>{child.title}</Link>;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </nav>
        <div className="sidebar-foot"><span>Runtime truth wins</span><small>Read coverage and health before execution.</small></div>
      </aside>

      <main id="doc-content" className="content-column">
        <div className="breadcrumb"><Link href="/docs">Docs</Link><span>/</span><span>{title}</span></div>
        <div className="eyebrow">{eyebrow}</div>
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        <footer className="page-footer"><span>RunOnProof public documentation</span><span>Explicit coverage · scoped claims · evidence first</span></footer>
      </main>

      {toc.length > 0 && (
        <aside className="toc" aria-label="On this page">
          <p>On this page</p>
          {toc.map((item) => <a className={item.level === 3 ? "depth-3" : ""} key={item.id} href={`#${item.id}`}>{item.text}</a>)}
        </aside>
      )}
    </div>
  );
}
