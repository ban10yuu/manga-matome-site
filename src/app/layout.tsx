import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://manga-matome-site.vercel.app'),
  title: {
    default: 'マンガ考察ラボ｜人気漫画の考察・ネタバレ・伏線まとめ',
    template: '%s｜マンガ考察ラボ',
  },
  description:
    'ONE PIECE、呪術廻戦、チェンソーマンなど人気漫画の考察・伏線・キャラクター分析をお届け。独自の視点で作品の魅力を深掘りする漫画考察専門サイトです。',
  keywords: [
    '漫画 考察',
    'マンガ考察',
    '漫画 ネタバレ',
    '漫画 伏線',
    'ONE PIECE 考察',
    '呪術廻戦 考察',
    'チェンソーマン 考察',
    '葬送のフリーレン 考察',
    'SPY×FAMILY 考察',
    'ブルーロック 考察',
    '推しの子 考察',
    'キングダム 考察',
    '進撃の巨人 考察',
    '鬼滅の刃 考察',
    'ヒロアカ 考察',
    'ハンターハンター 考察',
    '漫画 まとめ',
    '漫画 感想',
    '漫画 レビュー',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'マンガ考察ラボ',
    title: 'マンガ考察ラボ｜人気漫画の考察・ネタバレ・伏線まとめ',
    description: 'ONE PIECE、呪術廻戦、チェンソーマンなど人気漫画100作品以上の考察・伏線・キャラクター分析。独自の視点で作品の魅力を深掘り。',
    url: 'https://manga-matome-site.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'マンガ考察ラボ',
    description: '人気漫画の考察・伏線・キャラクター分析をお届けする専門サイト',
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
    canonical: 'https://manga-matome-site.vercel.app',
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
