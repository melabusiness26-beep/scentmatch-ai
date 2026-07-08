import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, KNOWLEDGE } from "@/data/knowledge";

export function generateStaticParams() {
  return KNOWLEDGE.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artikel nicht gefunden" };
  return {
    title: article.title,
    description: article.teaser,
    alternates: { canonical: `/wissen/${article.slug}` },
  };
}

export default async function WissenArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = KNOWLEDGE.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="container-page py-12">
      <nav className="text-sm">
        <Link href="/wissen" className="font-semibold text-accent-deep hover:underline">
          ← Alle Schweiz-Wissen-Artikel
        </Link>
      </nav>

      <article className="mx-auto mt-6 max-w-3xl">
        <span className="text-4xl">{article.emoji}</span>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{article.teaser}</p>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted">
          {article.readMinutes} Min. Lesezeit
        </p>

        <div className="mt-8 space-y-8">
          {article.sections.map((s) => (
            <section key={s.heading} className="card">
              <h2 className="font-display text-xl font-bold">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm leading-relaxed">
                      <span className="text-accent-deep">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <section className="mx-auto mt-12 max-w-3xl">
        <h2 className="font-display text-xl font-extrabold">Weiterlesen</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {others.map((a) => (
            <Link key={a.slug} href={`/wissen/${a.slug}`} className="card !p-4 transition hover:border-accent">
              <span className="text-2xl">{a.emoji}</span>
              <span className="mt-2 block text-sm font-bold leading-snug">{a.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
