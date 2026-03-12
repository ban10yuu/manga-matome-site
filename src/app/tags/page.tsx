import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getArticlesByTag, tagToSlug } from '@/lib/articles';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

const SITE_URL = 'https://manga-matome-site.vercel.app';

export const metadata: Metadata = {
  title: 'タグ一覧｜漫画考察・分析記事をタグから探す',
  description: '人気漫画の考察・ネタバレ・伏線・キャラクター分析記事をタグから探せます。キーワードで気になるテーマの記事を見つけましょう。',
  keywords: ['漫画 タグ', '漫画考察 タグ一覧', '漫画 テーマ', '漫画 キーワード', '考察 キーワード', '伏線 タグ'],
  openGraph: {
    title: 'タグ一覧｜漫画考察・分析記事をタグから探す',
    description: '人気漫画の考察記事をタグから探せます。',
    url: `${SITE_URL}/tags`,
    siteName: 'マンガ考察ラボ',
  },
  alternates: {
    canonical: `${SITE_URL}/tags`,
  },
};

export default function TagsPage() {
  const allTags = getAllTags();

  // Build tag data with counts and sort by count descending
  const tagData = allTags
    .map(tag => ({
      tag,
      slug: tagToSlug(tag),
      count: getArticlesByTag(tag).length,
    }))
    .sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...tagData.map(t => t.count));

  const breadcrumbItems = [
    { name: 'ホーム', url: SITE_URL },
    { name: 'タグ一覧', url: `${SITE_URL}/tags` },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
            <Link href="/" className="hover:text-[#ff3a4f] transition-colors">ホーム</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-400">タグ一覧</span>
          </nav>
          <h1 className="text-2xl font-black text-white">タグ一覧</h1>
          <p className="text-sm text-gray-600 mt-1">{allTags.length}個のタグ</p>
        </div>

        {/* GoogleAd: After heading */}
        <GoogleAd className="mb-6" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            {/* Tag Cloud */}
            <div className="manga-panel p-6 md:p-8 mb-8">
              <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                タグクラウド
              </h2>
              <div className="flex flex-wrap gap-2">
                {tagData.map(({ tag, slug, count }) => {
                  // Scale font size based on article count
                  const ratio = count / maxCount;
                  const sizeClass = ratio > 0.7
                    ? 'text-base font-black'
                    : ratio > 0.4
                      ? 'text-sm font-bold'
                      : 'text-xs font-medium';
                  const colorClass = ratio > 0.7
                    ? 'text-[#ff3a4f] border-[#ff3a4f]/40 hover:border-[#ff3a4f] hover:bg-[#ff3a4f]/10'
                    : ratio > 0.4
                      ? 'text-[#ffd23f] border-[#ffd23f]/30 hover:border-[#ffd23f] hover:bg-[#ffd23f]/10'
                      : 'text-gray-400 border-[#2a2a3a] hover:border-gray-500 hover:bg-[#1e1e2a]';

                  return (
                    <Link
                      key={tag}
                      href={`/tag/${slug}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all ${sizeClass} ${colorClass}`}
                    >
                      <span className="opacity-60">#</span>
                      {tag}
                      <span className="text-[10px] text-gray-600 ml-0.5">({count})</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* GoogleAd: Between cloud and list */}
            <GoogleAd className="mb-8" />

            {/* Tag List */}
            <div className="manga-panel p-6 md:p-8">
              <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                すべてのタグ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {tagData.map(({ tag, slug, count }) => (
                  <Link
                    key={tag}
                    href={`/tag/${slug}`}
                    className="flex items-center justify-between py-2.5 px-3 rounded hover:bg-[#1e1e2a] transition-colors group"
                  >
                    <span className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
                      <span className="text-[#ff3a4f] opacity-60 group-hover:opacity-100">#</span>
                      {tag}
                    </span>
                    <span className="text-[10px] text-gray-600 bg-[#1e1e2a] group-hover:bg-[#252535] px-2 py-0.5 rounded transition-colors">
                      {count}件
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* GoogleAd: After list */}
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
