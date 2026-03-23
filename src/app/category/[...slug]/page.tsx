import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getArticlesByCategory } from '@/lib/articles';
import { CATEGORY_LABELS, ArticleCategory } from '@/lib/types';
import ArticleCard from '@/components/ArticleCard';
import GoogleAd from '@/components/GoogleAd';
import Sidebar from '@/components/Sidebar';

const ARTICLES_PER_PAGE = 24;

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

const validCategories = ['character', 'theory', 'theme', 'scene', 'comparison', 'all'];

function parseParams(slugSegments: string[]): { category: string; page: number } | null {
  if (slugSegments.length === 1) {
    // /category/all or /category/character
    if (validCategories.includes(slugSegments[0])) {
      return { category: slugSegments[0], page: 1 };
    }
    return null;
  }
  if (slugSegments.length === 2) {
    // /category/all/2
    const category = slugSegments[0];
    const pageNum = parseInt(slugSegments[1], 10);
    if (validCategories.includes(category) && !isNaN(pageNum) && pageNum >= 1) {
      return { category, page: pageNum };
    }
    return null;
  }
  return null;
}

function getArticlesForCategory(category: string) {
  if (category === 'all') {
    return getAllArticles();
  }
  return getArticlesByCategory(category as ArticleCategory);
}

function getTitleForCategory(category: string): string {
  if (category === 'all') {
    return 'すべての考察記事';
  }
  return CATEGORY_LABELS[category as ArticleCategory] || category;
}

export function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  for (const category of validCategories) {
    // Page 1 (no page number in URL)
    params.push({ slug: [category] });

    // Additional pages
    const articles = getArticlesForCategory(category);
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
    for (let page = 2; page <= totalPages; page++) {
      params.push({ slug: [category, String(page)] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const parsed = parseParams(slugSegments);
  if (!parsed) return {};

  const { category, page } = parsed;
  const title = getTitleForCategory(category);
  const pageSuffix = page > 1 ? ` (${page}ページ目)` : '';

  if (category === 'all') {
    return {
      title: `すべての考察記事${pageSuffix}`,
      description: '人気漫画の考察・伏線・キャラクター分析記事の一覧。',
    };
  }
  const label = CATEGORY_LABELS[category as ArticleCategory] || category;
  return {
    title: `${label}の記事一覧${pageSuffix}`,
    description: `${label}に関する漫画考察記事の一覧です。`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug: slugSegments } = await params;
  const parsed = parseParams(slugSegments);

  // Fallback to 'all' page 1 if parsing fails
  const category = parsed?.category || 'all';
  const currentPage = parsed?.page || 1;

  const allArticles = getArticlesForCategory(category);
  const title = getTitleForCategory(category);
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = allArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const categoryBase = `/category/${category}`;

  function pageUrl(page: number): string {
    if (page === 1) return categoryBase;
    return `${categoryBase}/${page}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 relative z-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-xs text-gray-600 mb-3 flex items-center gap-1">
          <Link href="/" className="hover:text-[#ff3a4f] transition-colors">ホーム</Link>
          <span className="text-gray-700">/</span>
          <span className="text-gray-400">{title}</span>
        </nav>
        <h1 className="text-2xl font-black text-white">{title}</h1>
        <p className="text-sm text-gray-600 mt-1">
          {allArticles.length}件の記事
          {totalPages > 1 && ` (${currentPage} / ${totalPages}ページ)`}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/category/all"
          className={`text-xs font-bold px-3 py-1.5 rounded border transition-colors ${
            category === 'all'
              ? 'bg-[#ff3a4f] text-white border-[#ff3a4f]'
              : 'bg-transparent text-gray-400 border-[#2a2a3a] hover:border-[#ff3a4f] hover:text-[#ff3a4f]'
          }`}
        >
          すべて
        </Link>
        {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
          <Link
            key={key}
            href={`/category/${key}`}
            className={`text-xs font-bold px-3 py-1.5 rounded border transition-colors ${
              category === key
                ? 'bg-[#ff3a4f] text-white border-[#ff3a4f]'
                : 'bg-transparent text-gray-400 border-[#2a2a3a] hover:border-[#ff3a4f] hover:text-[#ff3a4f]'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* GoogleAd: After heading */}
      <GoogleAd className="mb-6" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {paginatedArticles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-2">記事が見つかりませんでした</p>
              <Link href="/" className="text-sm text-[#ff3a4f] hover:text-[#ffd23f] font-bold">
                トップページに戻る
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-black text-white mb-4 flex items-center gap-2">
                <span className="text-[#ff3a4f]">▎</span>
                記事一覧
                <span className="text-sm font-normal text-gray-600">
                  ({startIndex + 1}-{Math.min(startIndex + ARTICLES_PER_PAGE, allArticles.length)}件 / {allArticles.length}件)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paginatedArticles.map(article => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="ページネーション">
              {/* Previous */}
              {currentPage > 1 ? (
                <Link
                  href={pageUrl(currentPage - 1)}
                  className="text-sm font-bold px-4 py-2 rounded border border-[#2a2a3a] text-gray-400 hover:border-[#ff3a4f] hover:text-[#ff3a4f] transition-colors"
                >
                  前へ
                </Link>
              ) : (
                <span className="text-sm font-bold px-4 py-2 rounded border border-[#1a1a2a] text-gray-700 cursor-not-allowed">
                  前へ
                </span>
              )}

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                // Show first, last, current, and adjacent pages
                const show =
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1;

                if (!show) {
                  // Show ellipsis between gaps
                  const prevShow =
                    page - 1 === 1 ||
                    page - 1 === totalPages ||
                    Math.abs(page - 1 - currentPage) <= 1;
                  if (prevShow) {
                    return (
                      <span key={page} className="text-gray-600 px-1">...</span>
                    );
                  }
                  return null;
                }

                return (
                  <Link
                    key={page}
                    href={pageUrl(page)}
                    className={`text-sm font-bold w-9 h-9 flex items-center justify-center rounded border transition-colors ${
                      page === currentPage
                        ? 'bg-[#ff3a4f] text-white border-[#ff3a4f]'
                        : 'border-[#2a2a3a] text-gray-400 hover:border-[#ff3a4f] hover:text-[#ff3a4f]'
                    }`}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page}
                  </Link>
                );
              })}

              {/* Next */}
              {currentPage < totalPages ? (
                <Link
                  href={pageUrl(currentPage + 1)}
                  className="text-sm font-bold px-4 py-2 rounded border border-[#2a2a3a] text-gray-400 hover:border-[#ff3a4f] hover:text-[#ff3a4f] transition-colors"
                >
                  次へ
                </Link>
              ) : (
                <span className="text-sm font-bold px-4 py-2 rounded border border-[#1a1a2a] text-gray-700 cursor-not-allowed">
                  次へ
                </span>
              )}
            </nav>
          )}

          {/* GoogleAd: After articles */}
          <GoogleAd className="mt-6" />
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
