# マンガ考察ラボ - デプロイ手順

## 技術スタック
- Next.js 16 (Static Export)
- Tailwind CSS 4
- TypeScript

## ホスティング (無料)

### 方法1: Vercel (推奨・最も簡単)

1. GitHubにリポジトリをpush
2. https://vercel.com でGitHubアカウントと連携
3. リポジトリをインポート
4. デプロイ (自動で `npm run build` が実行される)

**無料枠**: 月100GB帯域、無制限デプロイ

### 方法2: Cloudflare Pages (無料・高速)

1. GitHubにリポジトリをpush
2. https://pages.cloudflare.com でプロジェクト作成
3. ビルドコマンド: `npm run build`
4. 出力ディレクトリ: `out`

**無料枠**: 月無制限帯域

### 方法3: GitHub Pages (完全無料)

1. `npm run build` を実行
2. `out/` ディレクトリの内容をリポジトリの `gh-pages` ブランチにpush
3. Settings > Pages で `gh-pages` ブランチを選択

## 独自ドメイン設定

Vercelの場合:
1. ダッシュボードで Settings > Domains
2. ドメイン名を入力
3. DNSレコードを設定 (CNAME → cname.vercel-dns.com)

安いドメイン (.com 約1,500円/年):
- Cloudflare Registrar
- Google Domains
- お名前.com

## コメント機能のアップグレード

現在はlocalStorageベースです。本番運用では以下に移行推奨:

### Supabase (無料)
1. https://supabase.com でプロジェクト作成
2. テーブル作成:
   ```sql
   CREATE TABLE comments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     article_slug TEXT NOT NULL,
     name TEXT DEFAULT '匿名',
     content TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```
3. 環境変数に `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定

## アフィリエイト設定

### 必要な登録
1. **A8.net** - 総合ASP (ebookjapan, DMMブックス等の案件)
2. **もしもアフィリエイト** - Amazon, 楽天の案件
3. **Amazonアソシエイト** - Kindle直接リンク
4. **バリューコマース** - ebookjapan特別単価

### リンクの差し替え
`src/data/affiliates.ts` のURLを、ASPから取得したアフィリエイトリンクに置き換えてください。

## 記事の追加方法

`src/data/articles/` に新しいファイルを作成するか、既存ファイルに記事を追加:
1. Article型に従ってデータを追加
2. `src/lib/articles.ts` にimportを追加
3. `npm run build` で再ビルド

## Googleサーチコンソール登録

1. https://search.google.com/search-console
2. プロパティを追加 (URL: https://manga-matome-site.vercel.app)
3. 所有権確認 (HTMLタグ方式が簡単)
4. サイトマップ送信: `https://manga-matome-site.vercel.app/sitemap.xml`
