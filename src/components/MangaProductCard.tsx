import { MangaInfo } from '@/lib/types';

const MOSHIMO_A_ID = '5417189';

function moshimoRakutenLink(url: string): string {
  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=54&pc_id=54&pl_id=616&url=${encodeURIComponent(url)}`;
}

export default function MangaProductCard({ manga }: { manga: MangaInfo }) {
  const amazonUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(manga.title + ' 1巻')}`;
  const rakutenUrl = moshimoRakutenLink(
    `https://books.rakuten.co.jp/search?sitem=${encodeURIComponent(manga.title + ' 1')}&g=001`
  );
  const yahooUrl = `https://shopping.yahoo.co.jp/search?p=${encodeURIComponent(manga.title + ' 1巻 漫画')}`;

  return (
    <div className="my-10 bg-[#16161f] border-2 border-[#2a2a3a] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-[#2a2a3a] px-4 py-3 flex items-center gap-2">
        <span className="text-[#ff3a4f] font-black text-sm">▎</span>
        <h3 className="font-black text-white text-base">{manga.title}</h3>
      </div>

      {/* Product card body */}
      <div className="p-5 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        {/* Cover image - AI生成ムード画像のみ使用 */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-shrink-0 hover:opacity-80 transition-opacity"
        >
          <img
            src={`/images/manga/${manga.slug}.jpg`}
            alt={`${manga.title} イメージ`}
            className="w-36 h-auto rounded border border-[#2a2a3a] shadow-lg shadow-black/40"
            style={{ maxHeight: '220px', objectFit: 'cover' }}
            loading="lazy"
          />
        </a>

        {/* Product info + buttons */}
        <div className="flex-1 w-full">
          <p className="text-sm font-bold text-gray-300 mb-1">
            {manga.title} 1
          </p>
          <p className="text-xs text-gray-400 mb-5">
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
