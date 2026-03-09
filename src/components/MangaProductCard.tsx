'use client';

import { useState } from 'react';
import { MangaInfo } from '@/lib/types';

const MOSHIMO_A_ID = '5417189';

function moshimoRakutenLink(url: string): string {
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodeURIComponent(url)}`;
}

// 各漫画の物理版1巻 ISBN-10（Amazonの画像URLに使用）
const MANGA_ISBN10: Record<string, string> = {
  'one-piece': '4088725093',
  'jujutsu-kaisen': '4088816323',
  'chainsaw-man': '4088821734',
  'spy-family': '4088822129',
  'frieren': '4098507133',
  'blue-lock': '4065140404',
  'oshi-no-ko': '4088824474',
  'kingdom': '4088747828',
  'dandadan': '4088830059',
  'sakamoto-days': '4088828836',
  'attack-on-titan': '4063842762',
  'demon-slayer': '4088808215',
  'my-hero-academia': '4088803590',
  'hunter-x-hunter': '4088725719',
  'dragon-ball-super': '4088808096',
  'naruto-boruto': '4088728408',
  'death-note': '4088736214',
  'fullmetal-alchemist': '4757506201',
  'tokyo-revengers': '4065148014',
  'one-punch-man': '4088806379',
};

export default function MangaProductCard({ manga }: { manga: MangaInfo }) {
  const [imgError, setImgError] = useState(false);

  const isbn10 = MANGA_ISBN10[manga.slug];
  const amazonUrl = isbn10
    ? `https://www.amazon.co.jp/dp/${isbn10}?tag=ban10yuu-22`
    : `https://www.amazon.co.jp/s?k=${encodeURIComponent(manga.title + ' 1巻')}`;
  const rakutenUrl = moshimoRakutenLink(
    `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(manga.title + ' 1')}&g=001`
  );
  const yahooUrl = `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(manga.title + ' 1巻 漫画')}`;

  // Amazon物理版の画像URL（ISBN-10ベース）
  const amazonImageUrl = isbn10
    ? `https://images-na.ssl-images-amazon.com/images/P/${isbn10}.09.LZZZZZZZ.jpg`
    : null;
  // フォールバック: 既存のムード画像
  const fallbackImageUrl = `/images/manga/${manga.slug}.jpg`;

  const imageUrl = imgError || !amazonImageUrl ? fallbackImageUrl : amazonImageUrl;

  return (
    <div className="my-10 bg-[#16161f] border-2 border-[#2a2a3a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#2a2a3a] px-4 py-3 flex items-center gap-2">
        <span className="text-[#ff3a4f] font-black text-sm">▎</span>
        <h3 className="font-black text-white text-base">{manga.title}</h3>
      </div>

      {/* Product card body */}
      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        {/* Cover image */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <img
            src={imageUrl}
            alt={`${manga.title} 1巻`}
            className="w-36 h-auto rounded border border-[#2a2a3a] shadow-lg shadow-black/40"
            style={{ maxHeight: '220px', objectFit: 'cover' }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        </a>

        {/* Product info + buttons */}
        <div className="flex-1 w-full">
          <p className="text-sm font-bold text-gray-300 mb-1">
            {manga.title} 1
          </p>
          <p className="text-xs text-gray-500 mb-5">
            {manga.author}
          </p>

          {/* Amazon button */}
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg mb-3 transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#f0984b',
              boxShadow: '0 2px 8px rgba(240,152,75,0.3)',
            }}
          >
            Amazonで見る
          </a>

          {/* Rakuten button */}
          <a
            href={rakutenUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg mb-3 transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#e07070',
              boxShadow: '0 2px 8px rgba(224,112,112,0.3)',
            }}
          >
            楽天市場で見る
          </a>

          {/* Yahoo button */}
          <a
            href={yahooUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="block w-full text-center font-bold text-sm text-white py-3 rounded-lg transition-all hover:brightness-110 hover:scale-[1.02]"
            style={{
              backgroundColor: '#7b9bcc',
              boxShadow: '0 2px 8px rgba(123,155,204,0.3)',
            }}
          >
            Yahoo!ショッピングで見る
          </a>
        </div>
      </div>

      <p className="text-[9px] text-gray-600 text-center pb-3">
        ※ 当サイトはアフィリエイトプログラムに参加しています
      </p>

      {/* もしもアフィリエイト impression tracker */}
      <img
        src={`https://i.moshimo.com/af/i/impression?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616`}
        width={1}
        height={1}
        style={{ border: 'none' }}
        alt=""
      />
    </div>
  );
}
