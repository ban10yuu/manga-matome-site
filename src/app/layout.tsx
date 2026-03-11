import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://manga-matome-site-phi.vercel.app'),
  title: {
    default: 'マンガ考察ラボ｜人気漫画の考察・ネタバレ・伏線・キャラクター分析まとめ',
    template: '%s｜マンガ考察ラボ',
  },
  description:
    'ONE PIECE、呪術廻戦、チェンソーマン、葬送のフリーレン、SPY×FAMILYなど人気漫画20作品の考察・ネタバレ・伏線回収・キャラクター分析を徹底解説。名シーンや名場面の深読み、最新話の展開予想まで、独自の視点で作品の魅力を掘り下げる漫画考察専門サイトです。',
  keywords: [
    // --- ジェネリック漫画キーワード ---
    '漫画 考察',
    '漫画考察',
    'マンガ考察',
    '漫画 ネタバレ',
    '漫画 ネタバレ まとめ',
    '漫画 伏線',
    '漫画 伏線回収',
    '漫画 おすすめ 考察',
    '漫画 キャラクター 分析',
    '漫画 名シーン',
    '漫画 名場面',
    '少年漫画 考察',
    '少年ジャンプ 考察',
    'アニメ 考察',
    'アニメ化 漫画',
    '漫画 考察 サイト',
    '漫画 考察 ブログ',
    '漫画 比較',
    '漫画 ランキング',
    '週刊少年ジャンプ',
    'ジャンプ 考察',
    '漫画 テーマ 分析',
    '漫画 深読み',
    '漫画 考察 2026',
    '最新 漫画 考察',
    '漫画 まとめ',
    '漫画 感想',
    '漫画 レビュー',
    '漫画 最終回 考察',
    '漫画 展開予想',
    // --- 作品別キーワード ---
    'ONE PIECE 考察',
    'ワンピース ネタバレ',
    'ワンピース 伏線',
    'ワンピース キャラクター',
    '呪術廻戦 考察',
    '呪術廻戦 ネタバレ',
    '呪術廻戦 伏線',
    '呪術廻戦 キャラクター',
    'チェンソーマン 考察',
    'チェンソーマン ネタバレ',
    'チェンソーマン 伏線',
    'SPY×FAMILY 考察',
    'スパイファミリー 考察',
    '葬送のフリーレン 考察',
    'フリーレン ネタバレ',
    'フリーレン 伏線',
    'ブルーロック 考察',
    'ブルーロック ネタバレ',
    '推しの子 考察',
    '推しの子 ネタバレ',
    '推しの子 伏線',
    'キングダム 考察',
    'キングダム ネタバレ',
    'ダンダダン 考察',
    'ダンダダン ネタバレ',
    'SAKAMOTO DAYS 考察',
    'サカモトデイズ ネタバレ',
    '進撃の巨人 考察',
    '進撃の巨人 伏線',
    '進撃の巨人 キャラクター',
    '鬼滅の刃 考察',
    '鬼滅の刃 ネタバレ',
    '鬼滅の刃 キャラクター',
    'ヒロアカ 考察',
    '僕のヒーローアカデミア 考察',
    'ハンターハンター 考察',
    'HUNTER×HUNTER ネタバレ',
    'ハンターハンター 伏線',
    'ドラゴンボール超 考察',
    'ドラゴンボール ネタバレ',
    'NARUTO 考察',
    'BORUTO 考察',
    'ナルト ボルト 考察',
    'デスノート 考察',
    'デスノート キャラクター',
    '鋼の錬金術師 考察',
    'ハガレン 伏線',
    '東京リベンジャーズ 考察',
    '東京リベンジャーズ ネタバレ',
    'ワンパンマン 考察',
    'ワンパンマン ネタバレ',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'マンガ考察ラボ',
    title: 'マンガ考察ラボ｜人気漫画の考察・ネタバレ・伏線・キャラクター分析まとめ',
    description: 'ONE PIECE、呪術廻戦、チェンソーマンなど人気漫画20作品の考察・ネタバレ・伏線回収・キャラクター分析を徹底解説。名シーンの深読みから最新話の展開予想まで。',
    url: 'https://manga-matome-site-phi.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'マンガ考察ラボ｜人気漫画の考察・ネタバレ・伏線まとめ',
    description: 'ONE PIECEや呪術廻戦など人気漫画20作品の考察・伏線回収・キャラクター分析をお届けする専門サイト',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://manga-matome-site-phi.vercel.app',
  },
  verification: {
    google: 'QNT_EwkmJ039_aVzqr1sKc_hySyn-ZpgLZDtAgxtsNo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1611624572831066"
          crossOrigin="anonymous"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-V11MKY0X3F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-V11MKY0X3F');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'マンガ考察ラボ',
              url: 'https://manga-matome-site-phi.vercel.app',
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="32x16" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
