'use client';

import { MangaInfo } from '@/lib/types';
import { getAffiliateLinks } from '@/data/affiliates';

const SERVICE_COLORS: Record<string, string> = {
  rakuten: '#bf0000',
  ebookjapan: '#ff0033',
  dmm: '#1a1a1a',
  kobo: '#bf0000',
  ameba: '#2dbe60',
  cmoa: '#ec4d8a',
  booklive: '#0075c2',
  mangaoukoku: '#ff6b00',
};

const SERVICE_TAGLINES: Record<string, string> = {
  rakuten: '楽天ポイントが貯まる！最大10倍還元',
  ebookjapan: '初回ログインで70%OFFクーポン配布中',
  dmm: '定期セールで最大90%OFF！品揃え豊富',
  kobo: '400万冊以上の電子書籍ストア',
  ameba: '100冊まで40%OFFの大型クーポン',
  cmoa: '読み放題プランも充実！初回70%OFF',
  booklive: '初回50%OFFクーポン配布中！',
  mangaoukoku: '毎日最大50%ポイント還元',
};

/**
 * 大型バナー広告コンポーネント
 * size: 'full' (横幅いっぱい), 'medium' (サイドバー用), 'compact' (セクション間)
 */
export default function AdBanner({
  manga,
  variant = 0,
  size = 'full',
}: {
  manga?: MangaInfo;
  variant?: number;
  size?: 'full' | 'medium' | 'compact';
}) {
  const links = manga ? getAffiliateLinks(manga) : [];
  const link = links[variant % links.length];

  if (!link) return null;

  const color = SERVICE_COLORS[link.service] || '#ffd23f';
  const tagline = SERVICE_TAGLINES[link.service] || '';
  const title = manga ? manga.title : '';

  if (size === 'full') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="block my-8 relative overflow-hidden rounded-xl group hover:shadow-xl hover:shadow-black/40 transition-all"
      >
        {/* Large banner */}
        <div className="relative border-2 border-[#2a2a3a] group-hover:border-[#3a3a4a] rounded-xl overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color}20 0%, ${color}05 40%, transparent 70%)`,
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10"
            style={{
              background: `radial-gradient(circle at 80% 50%, ${color} 0%, transparent 70%)`,
            }}
          />

          <div className="relative p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4">
            {/* Left: Service info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}80` }}
                />
                <span className="text-xs font-bold text-gray-500">PR</span>
              </div>
              <div className="text-lg md:text-xl font-black text-white mb-1">
                {link.label.replace('で読む', '')}
              </div>
              <p className="text-sm text-gray-400 mb-3">{tagline}</p>
              {title && (
                <p className="text-xs text-gray-500">
                  『{title}』を今すぐ読める
                </p>
              )}
            </div>

            {/* Right: Badge + CTA */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              {link.badge && (
                <div
                  className="text-xl md:text-2xl font-black text-white px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 4px 20px ${color}50`,
                  }}
                >
                  {link.badge}
                </div>
              )}
              <div
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-black text-white transition-all group-hover:brightness-110 group-hover:scale-105"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 2px 12px ${color}40`,
                }}
              >
                今すぐチェック
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (size === 'medium') {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="block relative overflow-hidden rounded-lg group hover:shadow-lg hover:shadow-black/30 transition-all"
      >
        <div className="relative border border-[#2a2a3a] rounded-lg overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${color}15 0%, transparent 60%)`,
            }}
          />
          <div className="relative p-5 text-center">
            <div className="text-[10px] text-gray-600 mb-2">PR</div>

            {/* Big badge */}
            {link.badge && (
              <div
                className="inline-block text-2xl font-black text-white px-5 py-2 rounded-lg mb-3"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 4px 16px ${color}40`,
                }}
              >
                {link.badge}
              </div>
            )}

            <div className="text-base font-black text-white mb-1">
              {link.label.replace('で読む', '')}
            </div>
            <p className="text-xs text-gray-500 mb-4">{tagline}</p>

            {/* CTA */}
            <div
              className="flex items-center justify-center gap-1 text-sm font-black py-2.5 rounded-md text-white group-hover:brightness-110 transition-all"
              style={{
                backgroundColor: color,
                boxShadow: `0 2px 8px ${color}40`,
              }}
            >
              詳しく見る
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // compact
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="block my-6 relative overflow-hidden rounded-lg group hover:scale-[1.01] transition-all"
    >
      <div className="relative border border-[#2a2a3a] group-hover:border-[#3a3a4a] rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(90deg, ${color} 0%, transparent 50%)` }}
        />
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: color }}
        />
        <div className="relative flex items-center gap-4 px-5 py-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] text-gray-600">PR</span>
              <span className="text-sm font-bold text-white">{link.label.replace('で読む', '')}</span>
            </div>
            <p className="text-xs text-gray-500 truncate">{tagline}</p>
          </div>
          {link.badge && (
            <span
              className="text-xs font-black text-white px-3 py-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}50` }}
            >
              {link.badge}
            </span>
          )}
          <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
