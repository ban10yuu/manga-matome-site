import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import GoogleAd from '@/components/GoogleAd';
import { getAllArticles } from '@/lib/articles';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Home() {
  const articles = getAllArticles();
  const featuredArticles = articles.slice(0, 3);
  const recentArticles = articles.slice(3, 15);

  return (
    <>
      {/* Hero with speed lines */}
      <section className="speed-lines bg-gradient-to-b from-[#0a0a12] via-[#12121d] to-[#0c0c14] py-16 border-b-2 border-[#2a2a3a]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <p className="text-[#ff3a4f] text-xs font-black tracking-[0.3em] uppercase mb-3">
              Manga Analysis Lab
            </p>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-white">
              マンガの世界を
              <span className="text-[#ff3a4f]">深く</span>
              読み解く
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto">
              人気漫画の伏線・キャラクター・テーマを独自の視点で徹底考察。
            </p>
          </div>

          {/* Featured Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredArticles.map(article => {
              const manga = mangaList.find(m => m.slug === article.mangaSlug);
              return (
                <Link
                  key={article.slug}
                  href={`/article/${article.slug}`}
                  className="group manga-panel !bg-[#16161f] p-5 hover:!border-[#ff3a4f]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: manga?.coverColor }}
                    />
                    <span className="text-xs text-gray-500 font-medium">{manga?.title}</span>
                  </div>
                  <h2 className="text-sm font-bold text-gray-200 mb-2 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-2">{article.excerpt}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GoogleAd: After hero */}
      <div className="bg-[#0c0c14] py-4">
        <div className="mx-auto max-w-7xl px-4">
          <GoogleAd className="my-2" />
        </div>
      </div>

      {/* Manga Tags */}
      <section className="bg-[#0c0c14] border-b border-[#2a2a3a] py-3 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 flex-nowrap">
            {mangaList.slice(0, 14).map(manga => (
              <Link
                key={manga.slug}
                href={`/manga/${manga.slug}`}
                className="flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded border border-[#2a2a3a] text-gray-500 hover:border-[#ff3a4f] hover:text-[#ff3a4f] hover:bg-[#ff3a4f]/5 transition-all"
              >
                {manga.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                最新の考察
              </h2>
              <div className="flex gap-3">
                {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).slice(0, 3).map(
                  ([key, label]) => (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors font-medium"
                    >
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recentArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* GoogleAd: After article grid */}
            <GoogleAd className="mt-6" />

            {/* Load More */}
            {articles.length > 15 && (
              <div className="text-center mt-8">
                <Link
                  href="/category/all"
                  className="inline-block bg-[#ff3a4f] text-white px-8 py-3 rounded text-sm font-black hover:bg-[#e52e42] transition-colors"
                >
                  すべての考察を見る（{articles.length}件）
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
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
            url: 'https://manga-matome.vercel.app',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://manga-matome.vercel.app/category/all?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}
