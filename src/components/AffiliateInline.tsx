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

/**
 * 記事途中に挿入するコンパクトなアフィリエイトバナー。
 * variant で表示するサービスのセットを変える（0: 1-2番目, 1: 3-4番目, 2: 5-6番目）
 */
export default function AffiliateInline({
  manga,
  variant = 0,
}: {
  manga: MangaInfo;
  variant?: number;
}) {
  const allLinks = getAffiliateLinks(manga);
  const start = (variant * 2) % allLinks.length;
  const links = [
    allLinks[start % allLinks.length],
    allLinks[(start + 1) % allLinks.length],
  ];

  return (
    <div className="my-8 relative">
      {/* Subtle divider */}
      <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#2a2a3a]" />

      <div className="relative bg-[#12121a] border border-[#2a2a3a] rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-black text-[#ffd23f]">▶</span>
          <span className="text-xs font-bold text-gray-400">
            『{manga.title}』をお得に読む
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {links.map(link => {
            const color = SERVICE_COLORS[link.service] || '#ffd23f';
            return (
              <a
                key={link.service}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-3 bg-[#1a1a28] border border-[#2a2a3a] rounded-lg px-4 py-3 group hover:border-[#3a3a4a] transition-all hover:scale-[1.02]"
              >
                {/* Color dot */}
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}60`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors truncate">
                    {link.label}
                  </div>
                </div>
                {link.badge && (
                  <span
                    className="text-[10px] font-black text-white px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
