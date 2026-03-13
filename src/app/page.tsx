import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import GoogleAd from '@/components/GoogleAd';
import { getAllArticles, getArticlesByCategory } from '@/lib/articles';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

const CATEGORY_ACCENT: Record<string, string> = {
  character: '#3b82f6',
  theory: '#a855f7',
  theme: '#10b981',
  scene: '#f97316',
  comparison: '#ec4899',
};

export default function Home() {
  const articles = getAllArticles();
  const heroArticle = articles[0];
  const heroManga = heroArticle ? mangaList.find(m => m.slug === heroArticle.mangaSlug) : null;
  const subArticles = articles.slice(1, 4);
  const recentArticles = articles.slice(4, 16);

  // Popular articles: diverse manga, skip featured
  const popularArticles: typeof articles = [];
  const seenSlugs = new Set(articles.slice(0, 4).map(a => a.slug));
  const seenManga = new Set<string>();
  for (const a of articles) {
    if (popularArticles.length >= 6) break;
    if (seenSlugs.has(a.slug)) continue;
    if (seenManga.has(a.mangaSlug) && popularArticles.length < 4) continue;
    popularArticles.push(a);
    seenSlugs.add(a.slug);
    seenManga.add(a.mangaSlug);
  }

  return (
    <>
      {/* Hero: 1 large featured article */}
      <section className="bg-[#0c0c14] pt-10 pb-12">
        <div className="mx-auto max-w-7xl px-4">
          {heroArticle && (
            <Link
              href={`/article/${heroArticle.slug}`}
              className="group block manga-panel !bg-[#16161f] p-6 md:p-8 hover:!border-[#ff3a4f] mb-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: heroManga?.coverColor }}
                />
                <span className="text-xs text-gray-500 font-medium">{heroManga?.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ff3a4f] text-white ml-2">
                  PICK UP
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-gray-200 mb-3 group-hover:text-[#ff3a4f] transition-colors leading-snug">
                {heroArticle.title}
              </h1>
              <p className="text-sm text-gray-500 line-clamp-3 max-w-3xl leading-relaxed">
                {heroArticle.excerpt}
              </p>
            </Link>
          )}

          {/* Sub-featured: 3 compact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {subArticles.map(article => {
              const manga = mangaList.find(m => m.slug === article.mangaSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group manga-panel !bg-[#16161f] p-4 hover:!border-[#ff3a4f]"
                >
                  <span className="text-[10px] text-gray-600 font-medium">{manga?.title}</span>
                  <h2 className="text-sm font-bold text-gray-300 mt-1 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h2>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GoogleAd: After hero */}
      <div className="bg-[#0c0c14] py-3">
        <div className="mx-auto max-w-7xl px-4">
          <GoogleAd className="my-1" />
        </div>
      </div>

      {/* Manga tags — compact horizontal scroll */}
      <section className="bg-[#0c0c14] border-b border-[#2a2a3a] py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 flex-wrap">
            {mangaList.map(manga => (
              <Link
                key={manga.slug}
                href={`/manga/${manga.slug}`}
                className="text-xs px-3 py-1 rounded border border-[#2a2a3a] text-gray-500 hover:border-[#ff3a4f] hover:text-[#ff3a4f] transition-colors"
              >
                {manga.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles — numbered list (not grid) */}
      <section className="bg-[#0c0c14] border-b border-[#2a2a3a] py-8">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-sm font-black text-white mb-4 flex items-center gap-2">
            <span className="text-[#ff3a4f]">▎</span>
            よく読まれている考察
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
            {popularArticles.map((article, idx) => {
              const manga = mangaList.find(m => m.slug === article.mangaSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group flex items-start gap-3 py-2"
                >
                  <span className="text-sm font-black text-[#ff3a4f]/50 flex-shrink-0 w-5 text-right">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-600">{manga?.title}</span>
                    <h3 className="text-xs text-gray-400 group-hover:text-[#ff3a4f] transition-colors line-clamp-2 leading-snug mt-0.5">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content: articles + sidebar */}
      <section className="mx-auto max-w-7xl px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                最新の考察記事
              </h2>
              <Link
                href="/category/all"
                className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors"
              >
                すべて見る
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            <GoogleAd className="mt-6" />

            {/* Category links — simple cards */}
            <div className="mt-12">
              <h2 className="text-base font-black text-white mb-5 flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                カテゴリ別で探す
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => {
                  const categoryArticles = getArticlesByCategory(key);
                  const accent = CATEGORY_ACCENT[key] || '#ff3a4f';
                  if (categoryArticles.length === 0) return null;
                  return (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="group manga-panel !bg-[#16161f] p-4 text-center hover:!border-current transition-colors"
                      style={{ '--tw-border-opacity': '1' } as React.CSSProperties}
                    >
                      <h3 className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                        {label}
                      </h3>
                      <span className="text-[10px] mt-1 block" style={{ color: accent }}>
                        {categoryArticles.length}件
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <GoogleAd className="mt-6" />

            {/* View all */}
            {articles.length > 16 && (
              <div className="text-center mt-8">
                <Link
                  href="/category/all"
                  className="inline-block bg-[#ff3a4f] text-white px-8 py-3 rounded text-sm font-bold hover:bg-[#e52e42] transition-colors"
                >
                  すべての考察を見る（{articles.length}件）
                </Link>
              </div>
            )}
          </div>

          <div className="lg:w-72 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'マンガ考察ラボ',
            description: '人気漫画の考察・伏線・キャラクター分析をお届けする漫画考察専門サイト',
            url: 'https://manga-matome-site.vercel.app',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://manga-matome-site.vercel.app/category/all?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}
