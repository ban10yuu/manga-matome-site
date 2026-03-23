import Link from 'next/link';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { getMangaBySlug } from '@/data/manga';
import { mangaHasImage } from '@/lib/images';

const DARK_CATEGORY_COLORS: Record<string, string> = {
  character: 'text-blue-400',
  theory: 'text-purple-400',
  theme: 'text-emerald-400',
  scene: 'text-orange-400',
  comparison: 'text-pink-400',
};

export default function ArticleCard({ article, showManga = true }: { article: Article; showManga?: boolean }) {
  const manga = getMangaBySlug(article.mangaSlug);
  const hasImage = mangaHasImage(article.mangaSlug);

  return (
    <article className="group">
      {/* Thumbnail */}
      {hasImage ? (
        <Link href={`/article/${article.slug}`} className="block relative h-32 overflow-hidden rounded-t">
          <img
            src={`/images/manga/${article.mangaSlug}.jpg`}
            alt={`${manga?.title || article.mangaSlug} - ${article.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#0c0c14]/50" />
        </Link>
      ) : (
        <div className="h-0.5 rounded-t" style={{ backgroundColor: manga?.coverColor || '#ff3a4f' }} />
      )}

      <div className="py-3 px-1">
        {/* Meta line */}
        <div className="flex items-center gap-2 mb-1.5 text-[10px]">
          <span className={`font-bold ${DARK_CATEGORY_COLORS[article.category] || 'text-gray-400'}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          {showManga && manga && (
            <Link
              href={`/manga/${manga.slug}`}
              className="text-gray-600 hover:text-[#ff3a4f] transition-colors"
            >
              {manga.title}
            </Link>
          )}
          <time className="text-gray-700 ml-auto" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
          </time>
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}`}>
          <h3 className="text-sm font-bold text-gray-300 group-hover:text-[#ff3a4f] transition-colors leading-snug line-clamp-2 mb-1.5">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </article>
  );
}
