import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mangaList, getMangaBySlug } from '@/data/manga';
import { getArticlesByManga } from '@/lib/articles';
import { getAffiliateLinks } from '@/data/affiliates';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { mangaHasImage } from '@/lib/images';
import { MangaPageJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return mangaList.map(manga => ({ slug: manga.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const manga = getMangaBySlug(slug);
  if (!manga) return {};

  const canonicalUrl = `https://manga-matome-site.vercel.app/manga/${slug}`;
  return {
    title: `${manga.title}の考察・ネタバレまとめ`,
    description: `${manga.title}（${manga.author}）の考察・伏線・キャラクター分析記事一覧。${manga.description}`,
    keywords: [manga.title, manga.titleEn, `${manga.title} 考察`, `${manga.title} ネタバレ`, `${manga.title} 伏線`, `${manga.title} まとめ`, `${manga.title} 感想`, '考察', 'ネタバレ', '伏線', 'マンガ考察', ...manga.genre],
    openGraph: {
      title: `${manga.title}の考察・ネタバレまとめ`,
      description: `${manga.title}の考察・伏線・キャラクター分析をお届け。`,
      url: canonicalUrl,
      siteName: 'マンガ考察ラボ',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function MangaPage({ params }: PageProps) {
  const { slug } = await params;
  const manga = getMangaBySlug(slug);
  if (!manga) notFound();

  const articles = getArticlesByManga(slug);
  const affiliateLinks = getAffiliateLinks(manga);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Manga Header */}
        <div className="speed-lines manga-panel !border-2 p-6 md:p-8 mb-8 relative overflow-hidden"
          style={{ borderColor: manga.coverColor }}
        >
          {mangaHasImage(slug) ? (
            <div className="absolute inset-0">
              <img src={`/images/manga/${slug}.jpg`} alt="" className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#16161f] via-[#16161f]/80 to-transparent" />
            </div>
          ) : (
            <div
              className="absolute inset-0 opacity-10"
              style={{ background: `linear-gradient(135deg, ${manga.coverColor}, transparent)` }}
            />
          )}
          <div className="relative z-10">
            <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
              <Link href="/" className="hover:text-[#ff3a4f] transition-colors">ホーム</Link>
              <span className="text-gray-700">/</span>
              <span className="text-gray-400">{manga.title}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{manga.title}</h1>
            <p className="text-sm text-gray-500 mb-3">
              <span className="text-gray-400">作者：{manga.author}</span>
              <span className="mx-2 text-gray-700">|</span>
              <span style={{ color: manga.coverColor }}>{manga.status === 'ongoing' ? '連載中' : '完結済み'}</span>
              <span className="mx-2 text-gray-700">|</span>
              <span className="text-gray-500">{manga.genre.join(' / ')}</span>
            </p>
            <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">{manga.description}</p>

            {/* Affiliate Links */}
            <div className="flex flex-wrap gap-2 mt-4">
              {affiliateLinks.slice(0, 3).map(link => (
                <a
                  key={link.service}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 bg-[#1e1e2a] hover:bg-[#252535] text-gray-300 text-xs font-bold px-3 py-1.5 rounded border border-[#2a2a3a] hover:border-[#ffd23f]/50 transition-all"
                >
                  {link.label}
                  {link.badge && (
                    <span className="text-[10px] font-black text-[#0c0c14] bg-[#ffd23f] px-1.5 py-0.5 rounded">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* GoogleAd: After manga header */}
        <GoogleAd className="mb-8" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Articles */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                考察記事一覧
                <span className="text-sm font-normal text-gray-600">({articles.length}件)</span>
              </h2>
            </div>

            {articles.length === 0 ? (
              <p className="text-gray-600 text-center py-12">記事の準備中です...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {articles.map(article => (
                  <ArticleCard key={article.slug} article={article} showManga={false} />
                ))}
              </div>
            )}

            {/* GoogleAd: After articles */}
            <GoogleAd className="mt-6" />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <MangaPageJsonLd manga={manga} articleCount={articles.length} />
      <BreadcrumbJsonLd
        items={[
          { name: 'ホーム', url: 'https://manga-matome-site.vercel.app' },
          { name: manga.title, url: `https://manga-matome-site.vercel.app/manga/${manga.slug}` },
        ]}
      />
    </>
  );
}
