import Link from 'next/link';
import { mangaList } from '@/data/manga';

export default function Footer() {
  const ongoingManga = mangaList.filter(m => m.status === 'ongoing').slice(0, 8);
  const completedManga = mangaList.filter(m => m.status === 'completed').slice(0, 8);

  return (
    <footer className="bg-[#0a0a12] text-gray-400 border-t-2 border-[#ff3a4f]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-black text-white mb-4 flex items-center gap-2">
              <span className="text-[#ff3a4f]">▶</span>
              マンガ考察<span className="text-[#ff3a4f]">ラボ</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-500">
              人気漫画の考察・ネタバレ・感想をお届けする漫画考察専門サイトです。
              独自の視点で作品の魅力を深掘りします。
            </p>
          </div>

          {/* Ongoing Manga */}
          <div>
            <h4 className="text-xs font-black text-[#ff3a4f] mb-4 tracking-widest uppercase">連載中の作品</h4>
            <ul className="space-y-2">
              {ongoingManga.map(manga => (
                <li key={manga.slug}>
                  <Link
                    href={`/manga/${manga.slug}`}
                    className="text-sm text-gray-500 hover:text-[#ff3a4f] transition-colors"
                  >
                    {manga.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Completed Manga */}
          <div>
            <h4 className="text-xs font-black text-[#ffd23f] mb-4 tracking-widest uppercase">完結済み作品</h4>
            <ul className="space-y-2">
              {completedManga.map(manga => (
                <li key={manga.slug}>
                  <Link
                    href={`/manga/${manga.slug}`}
                    className="text-sm text-gray-500 hover:text-[#ffd23f] transition-colors"
                  >
                    {manga.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black text-[#00d4ff] mb-4 tracking-widest uppercase">カテゴリ</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/character" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">
                  キャラクター考察
                </Link>
              </li>
              <li>
                <Link href="/category/theory" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">
                  伏線・謎考察
                </Link>
              </li>
              <li>
                <Link href="/category/theme" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">
                  テーマ考察
                </Link>
              </li>
              <li>
                <Link href="/category/scene" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">
                  名シーン解説
                </Link>
              </li>
              <li>
                <Link href="/category/comparison" className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors">
                  比較・考察
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-black text-gray-500 mt-6 mb-4 tracking-widest uppercase">電子書籍</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://ebookjapan.yahoo.co.jp/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-500 hover:text-[#ff3a4f] transition-colors">
                  ebookjapan
                </a>
              </li>
              <li>
                <a href="https://book.dmm.com/" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-500 hover:text-[#ff3a4f] transition-colors">
                  DMMブックス
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a3a] text-center text-xs text-gray-600">
          <p>※ 当サイトの考察は個人の見解であり、公式の情報ではありません。</p>
          <p className="mt-1">※ 当サイトはアフィリエイトプログラムに参加しています。</p>
          <p className="mt-4 text-gray-500">&copy; {new Date().getFullYear()} マンガ考察ラボ</p>
        </div>
      </div>
    </footer>
  );
}
