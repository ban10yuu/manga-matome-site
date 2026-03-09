import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/articles';
import { getMangaBySlug } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import AffiliateWidget from '@/components/AffiliateWidget';
import AdBanner from '@/components/AdBanner';
import MangaProductCard from '@/components/MangaProductCard';
import CommentSection from '@/components/CommentSection';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';

const DARK_CATEGORY_COLORS: Record<string, string> = {
  character: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  theory: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  theme: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  scene: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  comparison: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const manga = getMangaBySlug(article.mangaSlug);

  const canonicalUrl = `https://manga-matome-site.vercel.app/article/${slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      tags: article.tags,
      url: canonicalUrl,
      siteName: 'マンガ考察ラボ',
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: article.excerpt,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const manga = getMangaBySlug(article.mangaSlug);
  const relatedArticles = getRelatedArticles(article, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <div className="bg-[#16161f] rounded border-2 border-[#2a2a3a] p-6 md:p-8">
              {/* PR notice */}
              <p className="text-[10px] text-gray-600 mb-4">※当サイトはアフィリエイト広告を利用しています</p>

              {/* Breadcrumb */}
              <nav className="text-xs text-gray-600 mb-4 flex items-center gap-1 flex-wrap">
                <Link href="/" className="hover:text-[#ff3a4f] transition-colors">ホーム</Link>
                <span className="text-gray-700">/</span>
                {manga && (
                  <>
                    <Link href={`/manga/${manga.slug}`} className="hover:text-[#ff3a4f] transition-colors">
                      {manga.title}
                    </Link>
                    <span className="text-gray-700">/</span>
                  </>
                )}
                <span className="text-gray-500 line-clamp-1">{article.title}</span>
              </nav>

              {/* Meta */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${DARK_CATEGORY_COLORS[article.category] || ''}`}>
                  {CATEGORY_LABELS[article.category]}
                </span>
                {manga && (
                  <Link
                    href={`/manga/${manga.slug}`}
                    className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#1e1e2a] text-gray-400 hover:text-white hover:bg-[#252535] transition-colors border border-[#2a2a3a]"
                  >
                    {manga.title}
                  </Link>
                )}
                <time className="text-[10px] text-gray-600 ml-auto" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
                {article.title}
              </h1>

              {/* Ad: Top banner after title */}
              {manga && <AdBanner manga={manga} variant={0} size="full" />}

              {/* Table of Contents */}
              {article.sections.length > 2 && (
                <div className="bg-[#1e1e2a] rounded p-4 mb-8 border border-[#2a2a3a]">
                  <h2 className="text-sm font-black text-[#ff3a4f] mb-3">◆ 目次</h2>
                  <ol className="space-y-1.5">
                    {article.sections.map((section, i) => (
                      <li key={i}>
                        <a
                          href={`#section-${i}`}
                          className="text-sm text-gray-500 hover:text-[#ff3a4f] transition-colors flex items-center gap-2"
                        >
                          <span className="text-[10px] font-black text-gray-600 w-5 text-right">{String(i + 1).padStart(2, '0')}</span>
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Article Content with ads between every section */}
              <div className="article-content">
                {article.sections.map((section, i) => (
                  <div key={i}>
                    <div id={`section-${i}`}>
                      <h2>{section.heading}</h2>
                      {section.content.split('\n\n').map((paragraph, j) => (
                        <p key={j} dangerouslySetInnerHTML={{ __html: paragraph }} />
                      ))}
                    </div>

                    {/* 商品カード: 2つ目のセクション後に表紙付きウィジェット */}
                    {manga && i === 1 && (
                      <MangaProductCard manga={manga} />
                    )}

                    {/* Ad after every section (except last, and not section 1 which has product card) */}
                    {manga && i < article.sections.length - 1 && i !== 1 && (
                      i % 3 === 0 ? (
                        <AdBanner manga={manga} variant={i + 1} size="full" />
                      ) : (
                        <AdBanner manga={manga} variant={i + 1} size="compact" />
                      )
                    )}
                  </div>
                ))}
              </div>

              {/* Main Affiliate CTA at end */}
              {manga && <AffiliateWidget manga={manga} />}

              {/* Ad: After main widget */}
              {manga && <AdBanner manga={manga} variant={5} size="full" />}

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-[#2a2a3a]">
                <span className="text-xs text-gray-600 font-bold">タグ:</span>
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] text-gray-500 bg-[#1e1e2a] border border-[#2a2a3a] px-2.5 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Comments */}
              <CommentSection articleSlug={article.slug} />
            </div>

            {/* Ad: Between article and related */}
            {manga && <AdBanner manga={manga} variant={6} size="full" />}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-[#ff3a4f]">▎</span>
                  関連する考察
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedArticles.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              </div>
            )}

            {/* Ad: After related articles */}
            {manga && <AdBanner manga={manga} variant={7} size="full" />}
          </article>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-16">
              <Sidebar manga={manga} />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            datePublished: article.publishedAt,
            author: {
              '@type': 'Organization',
              name: 'マンガ考察ラボ',
            },
            publisher: {
              '@type': 'Organization',
              name: 'マンガ考察ラボ',
            },
            keywords: article.tags.join(', '),
          }),
        }}
      />
    </>
  );
}
