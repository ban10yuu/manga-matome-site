import Link from 'next/link';
import { mangaList } from '@/data/manga';
import { CATEGORY_LABELS } from '@/lib/types';
import type { ArticleCategory } from '@/lib/types';

export default function Footer() {
  const ongoingManga = mangaList.filter(m => m.status === 'ongoing');
  const completedManga = mangaList.filter(m => m.status === 'completed');

  return (
    <footer className="bg-[#0a0a12] text-gray-400 border-t-2 border-[#ff3a4f]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Site Description */}
        <div className="mb-10 pb-8 border-b border-[#2a2a3a]">
          <h2 className="text-lg font-black text-white mb-3 flex items-center gap-2">
            <span className="text-[#ff3a4f]">▶</span>
            マンガ考察<span className="text-[#ff3a4f]">ラボ</span>について
          </h2>
          <p className="text-sm leading-relaxed text-gray-500 max-w-3xl">
            マンガ考察ラボは、人気漫画の考察・ネタバレ・伏線回収・キャラクター分析を専門に扱うサイトです。
            ONE PIECE・呪術廻戦・チェンソーマン・進撃の巨人・鬼滅の刃など{mangaList.length}作品を網羅し、
            独自の視点で作品に隠された伏線や物語のテーマを徹底考察しています。
            連載中の最新話考察から完結作品の深読みまで、漫画をもっと楽しむための情報をお届けします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Ongoing Manga */}
          <div>
            <h3 className="text-xs font-black text-[#ff3a4f] mb-4 tracking-widest uppercase">連載中の作品（{ongoingManga.length}作品）</h3>
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
            <h3 className="text-xs font-black text-[#ffd23f] mb-4 tracking-widest uppercase">完結済み作品（{completedManga.length}作品）</h3>
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
            <h3 className="text-xs font-black text-[#00d4ff] mb-4 tracking-widest uppercase">カテゴリ</h3>
            <ul className="space-y-2">
              {(Object.entries(CATEGORY_LABELS) as [ArticleCategory, string][]).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={`/category/${key}`}
                    className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/category/all"
                  className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors font-bold"
                >
                  すべての記事を見る
                </Link>
              </li>
            </ul>

            <h3 className="text-xs font-black text-gray-500 mt-6 mb-4 tracking-widest uppercase">電子書籍</h3>
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

          {/* Popular Manga Keywords for SEO */}
          <div>
            <h3 className="text-xs font-black text-gray-500 mb-4 tracking-widest uppercase">人気の考察キーワード</h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                'ONE PIECE 考察', '呪術廻戦 ネタバレ', 'チェンソーマン 伏線',
                '進撃の巨人 解説', '鬼滅の刃 キャラ', 'ブルーロック 分析',
                'フリーレン 考察', 'キングダム 戦略', 'ダンダダン 最新',
                'HUNTER×HUNTER 念能力', 'デスノート 頭脳戦', 'ワンパンマン 強さ',
              ].map(keyword => (
                <span key={keyword} className="text-[10px] text-gray-600 bg-[#16161f] border border-[#2a2a3a] px-2 py-1 rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 関連サイト */}
        <div className="mt-10 pt-6 border-t border-[#2a2a3a]">
          <h3 className="text-xs font-black text-gray-500 mb-3 tracking-widest uppercase">関連サイト</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <a href="https://anime-review-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors">Anime Review Lab</a>
            <a href="https://ai-tools-site-dusky.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors">AIツールラボ</a>
            <a href="https://vod-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors">動画配信ナビ</a>
            <a href="https://fukusen-lab.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors">伏線回収ラボ</a>
            <a href="https://joseikin-navi-site.vercel.app" target="_blank" rel="noopener" className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors">助成金ナビ</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2a2a3a] text-center text-xs text-gray-600">
          <div className="flex justify-center gap-4 mb-4">
            <Link href="/privacy" className="text-gray-500 hover:text-[#ff3a4f] transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-gray-700">|</span>
            <Link href="/contact" className="text-gray-500 hover:text-[#ff3a4f] transition-colors">
              お問い合わせ
            </Link>
          </div>
          <p>※ 当サイトの考察は個人の見解であり、公式の情報ではありません。</p>
          <p className="mt-1">※ 当サイトはアフィリエイトプログラムに参加しています。</p>
          <p className="mt-4 text-gray-500">&copy; {new Date().getFullYear()} マンガ考察ラボ — 漫画考察・ネタバレ・伏線分析の専門サイト</p>
        </div>
      </div>
    </footer>
  );
}
