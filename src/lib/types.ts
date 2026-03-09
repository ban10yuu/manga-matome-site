export type ArticleCategory = 'character' | 'theory' | 'theme' | 'scene' | 'comparison';

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  mangaSlug: string;
  category: ArticleCategory;
  excerpt: string;
  sections: ArticleSection[];
  tags: string[];
  publishedAt: string;
  relatedSlugs?: string[];
}

export interface MangaInfo {
  slug: string;
  title: string;
  titleEn: string;
  author: string;
  status: 'ongoing' | 'completed';
  genre: string[];
  description: string;
  coverColor: string;
  ebookjapanId?: string;
  dmmBooksId?: string;
  amazonId?: string;
}

export interface AffiliateLink {
  service: 'ebookjapan' | 'dmm' | 'amazon' | 'cmoa' | 'renta' | 'rakuten' | 'kobo' | 'ameba' | 'booklive' | 'mangaoukoku';
  label: string;
  url: string;
  badge?: string;
}

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  character: 'キャラクター考察',
  theory: '伏線・謎考察',
  theme: 'テーマ考察',
  scene: '名シーン解説',
  comparison: '比較・考察',
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  character: 'bg-blue-100 text-blue-800',
  theory: 'bg-purple-100 text-purple-800',
  theme: 'bg-green-100 text-green-800',
  scene: 'bg-orange-100 text-orange-800',
  comparison: 'bg-pink-100 text-pink-800',
};
