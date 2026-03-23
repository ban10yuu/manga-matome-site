import Link from 'next/link';
import { MangaInfo, CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';
import { mangaList } from '@/data/manga';
import { getPopularArticles } from '@/lib/articles';
import { generalAffiliates } from '@/data/affiliates';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';

export default function Sidebar({ manga }: { manga?: MangaInfo | null }) {
  const popularArticles = getPopularArticles(8);

  return (
    <aside className="space-y-6">
      {/* Ad Banner */}
      {manga && <AdBanner manga={manga} variant={2} size="medium" />}

      {/* Popular Articles */}
      <div className="manga-panel p-4">
        <h3 className="text-xs font-black text-[#ff3a4f] mb-3">
          人気の考察
        </h3>
        <ol className="space-y-2">
          {popularArticles.map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="flex gap-2.5 group"
              >
                <span className={`rank-badge ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <GoogleAd format="rectangle" />

      {/* Affiliate — compact list */}
      <div className="manga-panel p-4">
        <h3 className="text-xs font-black text-[#ffd23f] mb-3">
          お得に漫画を読む
        </h3>
        <div className="space-y-2">
          {generalAffiliates.slice(0, 4).map((af, i) => (
            <a
              key={af.title}
              href={af.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-3 p-2.5 rounded border border-[#2a2a3a] hover:border-[#3a3a4a] transition-colors"
            >
              <div
                className="w-1 h-8 rounded-full flex-shrink-0"
                style={{ backgroundColor: af.color }}
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-bold text-white block">{af.title}</span>
                <span className="text-[10px] text-gray-600 line-clamp-1">{af.description}</span>
              </div>
              {af.badge && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white flex-shrink-0"
                  style={{ backgroundColor: af.color }}
                >
                  {af.badge}
                </span>
              )}
            </a>
          ))}
          {generalAffiliates.length > 4 && (
            <details className="mt-1">
              <summary className="text-[10px] text-gray-600 cursor-pointer hover:text-[#ffd23f] transition-colors">
                他のサービスを見る（{generalAffiliates.length - 4}件）
              </summary>
              <div className="space-y-2 mt-2">
                {generalAffiliates.slice(4).map(af => (
                  <a
                    key={af.title}
                    href={af.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center gap-3 p-2.5 rounded border border-[#2a2a3a] hover:border-[#3a3a4a] transition-colors"
                  >
                    <div
                      className="w-1 h-8 rounded-full flex-shrink-0"
                      style={{ backgroundColor: af.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-white block">{af.title}</span>
                      <span className="text-[10px] text-gray-600 line-clamp-1">{af.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {manga && <AdBanner manga={manga} variant={3} size="medium" />}

      {/* Categories */}
      <div className="manga-panel p-4">
        <h3 className="text-xs font-black text-gray-400 mb-3">
          カテゴリ
        </h3>
        <div className="space-y-1">
          {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="block py-1 text-xs text-gray-400 hover:text-[#ff3a4f] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Manga List */}
      <div className="manga-panel p-4">
        <h3 className="text-xs font-black text-gray-400 mb-3">
          作品一覧
        </h3>
        <div className="space-y-0.5">
          {mangaList.map(m => (
            <Link
              key={m.slug}
              href={`/manga/${m.slug}`}
              className="flex items-center gap-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: m.coverColor }} />
              {m.title}
            </Link>
          ))}
        </div>
      </div>

      {manga && <AdBanner manga={manga} variant={6} size="medium" />}
      <GoogleAd format="rectangle" />
    </aside>
  );
}
