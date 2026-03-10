import Link from 'next/link';
import { MangaInfo } from '@/lib/types';
import { mangaList } from '@/data/manga';
import { getPopularArticles } from '@/lib/articles';
import { generalAffiliates } from '@/data/affiliates';
import AdBanner from '@/components/AdBanner';
import GoogleAd from '@/components/GoogleAd';

export default function Sidebar({ manga }: { manga?: MangaInfo | null }) {
  const popularArticles = getPopularArticles(5);

  return (
    <aside className="space-y-6">
      {/* Ad Banner: Top of sidebar */}
      {manga && <AdBanner manga={manga} variant={2} size="medium" />}

      {/* Affiliate Banner */}
      <div className="manga-panel !border-[#ffd23f] p-5">
        <h3 className="text-sm font-black text-[#ffd23f] mb-4 flex items-center gap-2">
          ◆ お得に漫画を読む
        </h3>
        <div className="space-y-3">
          {generalAffiliates.slice(0, 4).map((af, i) => (
            <a
              key={af.title}
              href={af.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block relative overflow-hidden rounded-lg group transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30"
            >
              {/* Background with brand color gradient */}
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${af.color} 0%, transparent 60%)`,
                }}
              />
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all"
                style={{ backgroundColor: af.color }}
              />

              <div className="relative bg-[#1a1a28] border border-[#2a2a3a] group-hover:border-[#3a3a4a] rounded-lg p-4 pl-5">
                {/* Top row: title + badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-base text-white">{af.title}</span>
                  {af.badge && (
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full text-white shadow-lg"
                      style={{
                        backgroundColor: af.color,
                        boxShadow: `0 0 12px ${af.color}60`,
                      }}
                    >
                      {af.badge}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{af.description}</p>

                {/* CTA button */}
                <div
                  className="flex items-center justify-center gap-1 text-sm font-bold py-2 rounded-md transition-all group-hover:brightness-110"
                  style={{
                    backgroundColor: af.color,
                    color: '#fff',
                    boxShadow: `0 2px 8px ${af.color}40`,
                  }}
                >
                  今すぐチェック
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Recommended ribbon for first item */}
                {i === 0 && (
                  <div className="absolute -top-0 -right-0">
                    <div className="bg-[#ffd23f] text-[#0c0c14] text-[10px] font-black px-3 py-0.5 rounded-bl-lg rounded-tr-lg">
                      おすすめ
                    </div>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Ad Banner: Mid sidebar */}
      {manga && <AdBanner manga={manga} variant={3} size="medium" />}

      {/* GoogleAd: Between affiliate and popular sections */}
      <GoogleAd format="rectangle" />

      {/* Popular Articles */}
      <div className="manga-panel p-5">
        <h3 className="text-sm font-black text-[#ff3a4f] mb-4 flex items-center gap-2">
          ◆ 人気の考察
        </h3>
        <ol className="space-y-3">
          {popularArticles.map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/article/${article.slug}`}
                className="flex gap-3 group"
              >
                <span className={`rank-badge ${i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-other'}`}>
                  {i + 1}
                </span>
                <span className="text-sm text-gray-400 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Ad Banner: After popular articles */}
      {manga && <AdBanner manga={manga} variant={4} size="medium" />}

      {/* More affiliates */}
      <div className="manga-panel !border-[#ffd23f] p-5">
        <h3 className="text-sm font-black text-[#ffd23f] mb-4 flex items-center gap-2">
          ◆ その他のサービス
        </h3>
        <div className="space-y-3">
          {generalAffiliates.slice(4).map(af => (
            <a
              key={af.title}
              href={af.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block relative overflow-hidden rounded-lg group transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30"
            >
              <div
                className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${af.color} 0%, transparent 60%)`,
                }}
              />
              <div
                className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-1.5 transition-all"
                style={{ backgroundColor: af.color }}
              />

              <div className="relative bg-[#1a1a28] border border-[#2a2a3a] group-hover:border-[#3a3a4a] rounded-lg p-4 pl-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-base text-white">{af.title}</span>
                  {af.badge && (
                    <span
                      className="text-xs font-black px-2.5 py-1 rounded-full text-white shadow-lg"
                      style={{
                        backgroundColor: af.color,
                        boxShadow: `0 0 12px ${af.color}60`,
                      }}
                    >
                      {af.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-3 leading-relaxed">{af.description}</p>
                <div
                  className="flex items-center justify-center gap-1 text-sm font-bold py-2 rounded-md transition-all group-hover:brightness-110"
                  style={{
                    backgroundColor: af.color,
                    color: '#fff',
                    boxShadow: `0 2px 8px ${af.color}40`,
                  }}
                >
                  今すぐチェック
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Manga List */}
      <div className="manga-panel p-5">
        <h3 className="text-sm font-black text-[#00d4ff] mb-4 flex items-center gap-2">
          ◆ 作品一覧
        </h3>
        <div className="space-y-0.5">
          {mangaList.map(m => (
            <Link
              key={m.slug}
              href={`/manga/${m.slug}`}
              className="flex items-center gap-2 py-1.5 px-2 rounded text-sm text-gray-500 hover:bg-[#1e1e2a] hover:text-white transition-colors"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: m.coverColor }} />
              {m.title}
              <span className="ml-auto text-[10px] text-gray-600">
                {m.status === 'ongoing' ? '連載中' : '完結'}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Ad Banner: Bottom of sidebar */}
      {manga && <AdBanner manga={manga} variant={6} size="medium" />}

      {/* GoogleAd: Bottom of sidebar */}
      <GoogleAd format="rectangle" />
    </aside>
  );
}
