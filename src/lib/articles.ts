import { Article, ArticleCategory } from './types';

// Dynamic import all article files
import { articles as onePieceArticles } from '@/data/articles/one-piece';
import { articles as jujutsuKaisenArticles } from '@/data/articles/jujutsu-kaisen';
import { articles as chainsawManArticles } from '@/data/articles/chainsaw-man';
import { articles as spyFamilyArticles } from '@/data/articles/spy-family';
import { articles as frierenArticles } from '@/data/articles/frieren';
import { articles as blueLockArticles } from '@/data/articles/blue-lock';
import { articles as oshiNoKoArticles } from '@/data/articles/oshi-no-ko';
import { articles as kingdomArticles } from '@/data/articles/kingdom';
import { articles as dandadanArticles } from '@/data/articles/dandadan';
import { articles as sakamotoDaysArticles } from '@/data/articles/sakamoto-days';
import { articles as attackOnTitanArticles } from '@/data/articles/attack-on-titan';
import { articles as demonSlayerArticles } from '@/data/articles/demon-slayer';
import { articles as myHeroAcademiaArticles } from '@/data/articles/my-hero-academia';
import { articles as hunterXHunterArticles } from '@/data/articles/hunter-x-hunter';
import { articles as dragonBallSuperArticles } from '@/data/articles/dragon-ball-super';
import { articles as narutoBorutoArticles } from '@/data/articles/naruto-boruto';
import { articles as deathNoteArticles } from '@/data/articles/death-note';
import { articles as fullmetalAlchemistArticles } from '@/data/articles/fullmetal-alchemist';
import { articles as tokyoRevengersArticles } from '@/data/articles/tokyo-revengers';
import { articles as onePunchManArticles } from '@/data/articles/one-punch-man';

const allArticles: Article[] = [
  ...onePieceArticles,
  ...jujutsuKaisenArticles,
  ...chainsawManArticles,
  ...spyFamilyArticles,
  ...frierenArticles,
  ...blueLockArticles,
  ...oshiNoKoArticles,
  ...kingdomArticles,
  ...dandadanArticles,
  ...sakamotoDaysArticles,
  ...attackOnTitanArticles,
  ...demonSlayerArticles,
  ...myHeroAcademiaArticles,
  ...hunterXHunterArticles,
  ...dragonBallSuperArticles,
  ...narutoBorutoArticles,
  ...deathNoteArticles,
  ...fullmetalAlchemistArticles,
  ...tokyoRevengersArticles,
  ...onePunchManArticles,
];

// ビルド時の日付で公開済み記事のみフィルタ（未来日付の記事は非表示）
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const publishedArticles = allArticles.filter(a => a.publishedAt <= BUILD_DATE);

export function getAllArticles(): Article[] {
  return publishedArticles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getArticlesByManga(mangaSlug: string): Article[] {
  return publishedArticles
    .filter(a => a.mangaSlug === mangaSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return publishedArticles
    .filter(a => a.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getRelatedArticles(article: Article, limit = 5): Article[] {
  const sameManga = publishedArticles.filter(
    a => a.mangaSlug === article.mangaSlug && a.slug !== article.slug
  );
  const sameCategory = publishedArticles.filter(
    a =>
      a.category === article.category &&
      a.mangaSlug !== article.mangaSlug &&
      a.slug !== article.slug
  );
  const related = [...sameManga, ...sameCategory];
  return related.slice(0, limit);
}

export function getPopularArticles(limit = 10): Article[] {
  return getAllArticles().slice(0, limit);
}

export function getAllSlugs(): string[] {
  return allArticles.map(a => a.slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return publishedArticles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
  );
}
