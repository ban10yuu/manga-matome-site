import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a12] text-gray-400 border-t border-[#2a2a3a]">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h2 className="text-sm font-black text-white mb-2">
              マンガ考察<span className="text-[#ff3a4f]">ラボ</span>
            </h2>
            <p className="text-xs leading-relaxed text-gray-600">
              人気漫画の考察・伏線回収・キャラクター分析を独自の視点で徹底考察。
              {mangaList.length}作品の考察記事をお届けしています。
            </p>
          </div>

          {/* Categories + Manga */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2">カテゴリ</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
                <Link
                  key={key}
                  href={`/category/${key}`}
                  className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <h3 className="text-xs font-bold text-gray-400 mb-2">作品</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {mangaList.slice(0, 10).map(manga => (
                <Link
                  key={manga.slug}
                  href={`/manga/${manga.slug}`}
                  className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors"
                >
                  {manga.title}
                </Link>
              ))}
              {mangaList.length > 10 && (
                <span className="text-xs text-gray-700">
                  他{mangaList.length - 10}作品
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-2">関連サイト</h3>
            <div className="flex flex-col gap-1 mb-4">
              <a href="https://fukusen-lab.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors">伏線回収ラボ</a>
              <a href="https://anime-review-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors">Anime Review Lab</a>
              <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-600 hover:text-[#ff3a4f] transition-colors">動画配信ナビ</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#2a2a3a] text-center text-xs text-gray-700">
          <div className="flex justify-center gap-4 mb-3">
            <Link href="/privacy" className="text-gray-600 hover:text-[#ff3a4f] transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-gray-800">|</span>
            <Link href="/contact" className="text-gray-600 hover:text-[#ff3a4f] transition-colors">
              お問い合わせ
            </Link>
          </div>
          <p className="text-gray-700">※ 当サイトの考察は個人の見解です。アフィリエイトプログラムに参加しています。</p>
          <p className="mt-2 text-gray-600">&copy; {new Date().getFullYear()} マンガ考察ラボ</p>
        </div>
      </div>
    </footer>
  );
}
