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

export default function AffiliateWidget({ manga }: { manga: MangaInfo }) {
  const links = getAffiliateLinks(manga);

  return (
    <div className="manga-panel !border-[#ffd23f] p-5 md:p-6 my-8">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">📚</span>
        <h3 className="text-base font-black text-[#ffd23f]">
          『{manga.title}』を読むなら
        </h3>
      </div>
      <p className="text-xs text-gray-500 mb-5">各サービスのキャンペーンを利用してお得に読めます</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((link, i) => {
          const color = SERVICE_COLORS[link.service] || '#ffd23f';
          return (
            <a
              key={link.service}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="relative block overflow-hidden rounded-lg group transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-black/40"
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${color} 0%, transparent 70%)` }}
              />
              <div className="relative bg-[#1a1a28] border border-[#2a2a3a] group-hover:border-[#3a3a4a] rounded-lg p-4">
                {/* Left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                  style={{ backgroundColor: color }}
                />

                {/* Badge */}
                {link.badge && (
                  <span
                    className="inline-block text-[11px] font-black px-2 py-0.5 rounded-full text-white mb-2"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}50`,
                    }}
                  >
                    {link.badge}
                  </span>
                )}

                {/* Service name */}
                <div className="font-bold text-sm text-white mb-3 pl-1">
                  {link.label}
                </div>

                {/* CTA button */}
                <div
                  className="flex items-center justify-center gap-1 text-xs font-black py-2 rounded-md text-white transition-all group-hover:brightness-110"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 2px 8px ${color}40`,
                  }}
                >
                  無料で試し読み
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Recommended badge for first 2 */}
              {i === 0 && (
                <div className="absolute top-0 right-0 bg-[#ffd23f] text-[#0c0c14] text-[9px] font-black px-2 py-0.5 rounded-bl-lg rounded-tr-lg">
                  人気 No.1
                </div>
              )}
            </a>
          );
        })}
      </div>

      <p className="text-[10px] text-gray-600 mt-4 text-center">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>
    </div>
  );
}
