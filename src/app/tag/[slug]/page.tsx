import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getArticlesByTag, tagToSlug, slugToTag } from '@/lib/articles';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://manga-matome-site.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(tag => ({ slug: tagToSlug(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slugToTag(slug);
  if (!tag) return {};

  const articles = getArticlesByTag(tag);
  const canonicalUrl = `${SITE_URL}/tag/${slug}`;

  return {
    title: `「${tag}」に関する漫画考察・分析記事一覧`,
    description: `「${tag}」タグが付いた漫画考察記事の一覧です。${articles.length}件の記事をお届けします。`,
    keywords: [tag, `${tag} 考察`, `${tag} ネタバレ`, `${tag} 伏線`, '漫画考察', 'マンガ考察'],
    openGraph: {
      title: `「${tag}」に関する漫画考察・分析記事一覧`,
      description: `「${tag}」タグが付いた漫画考察記事の一覧。`,
      url: canonicalUrl,
      siteName: 'マンガ考察ラボ',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slugToTag(slug);

  if (!tag) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-2">タグが見つかりませんでした</p>
          <Link href="/tags" className="text-sm text-[#ff3a4f] hover:text-[#ffd23f] font-bold">
            タグ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const articles = getArticlesByTag(tag);

  const breadcrumbItems = [
    { name: 'ホーム', url: SITE_URL },
    { name: 'タグ一覧', url: `${SITE_URL}/tags` },
    { name: tag, url: `${SITE_URL}/tag/${slug}` },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-[#ff3a4f] transition-colors">ホーム</Link>
            <span className="text-gray-700">/</span>
            <Link href="/tags" className="hover:text-[#ff3a4f] transition-colors">タグ一覧</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400">{tag}</span>
          </nav>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="text-[#ff3a4f] text-lg">#</span>
            {tag}
          </h1>
          <p className="text-sm text-gray-600 mt-1">{articles.length}件の記事</p>
        </div>

        {/* GoogleAd: After heading */}
        <GoogleAd className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-2">記事が見つかりませんでした</p>
                <Link href="/tags" className="text-sm text-[#ff3a4f] hover:text-[#ffd23f] font-bold">
                  タグ一覧に戻る
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                  <span className="text-[#ff3a4f]">▎</span>
                  「{tag}」の記事一覧
                  <span className="text-sm font-normal text-gray-600">({articles.length}件)</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {articles.map(article => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </>
            )}

            {/* GoogleAd: After articles */}
            <GoogleAd className="mt-6" />
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Structured Data: BreadcrumbList */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
    </>
  );
}
