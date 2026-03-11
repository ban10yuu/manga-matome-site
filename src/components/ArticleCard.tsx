import Link from 'next/link';
import { Article, CATEGORY_LABELS } from '@/lib/types';
import { getMangaBySlug } from '@/data/manga';
import { mangaHasImage } from '@/lib/images';
import { tagToSlug } from '@/lib/articles';

const DARK_CATEGORY_COLORS: Record<string, string> = {
  character: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  theory: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  theme: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  scene: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  comparison: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
};

export default function ArticleCard({ article, showManga = true }: { article: Article; showManga?: boolean }) {
  const manga = getMangaBySlug(article.mangaSlug);
  const hasImage = mangaHasImage(article.mangaSlug);

  return (
    <article className="manga-panel group overflow-hidden">
      {/* Thumbnail image */}
      {hasImage ? (
        <Link href={`/article/${article.slug}`} className="block relative h-36 overflow-hidden">
          <img
            src={`/images/manga/${article.mangaSlug}.jpg`}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#16161f]/60" />
        </Link>
      ) : (
        <div className="h-1" style={{ backgroundColor: manga?.coverColor || '#ff3a4f' }} />
      )}

      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${DARK_CATEGORY_COLORS[article.category] || ''}`}>
            {CATEGORY_LABELS[article.category]}
          </span>
          {showManga && manga && (
            <Link
              href={`/manga/${manga.slug}`}
              className="text-xs text-gray-500 hover:text-[#ff3a4f] transition-colors"
            >
              {manga.title}
            </Link>
          )}
          <time className="text-[10px] text-gray-600 ml-auto" dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
          </time>
        </div>

        {/* Title */}
        <Link href={`/article/${article.slug}`}>
          <h3 className="text-base font-bold text-gray-200 group-hover:text-[#ff3a4f] transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {article.excerpt}
        </p>

        {/* Tags + Read more */}
        <div className="flex items-center gap-2 flex-wrap">
          {article.tags.slice(0, 3).map(tag => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="text-[10px] text-gray-600 before:content-['#'] hover:text-[#ff3a4f] transition-colors"
            >
              {tag}
            </Link>
          ))}
          <Link
            href={`/article/${article.slug}`}
            className="ml-auto text-xs font-bold text-[#ff3a4f] hover:text-[#ffd23f] transition-colors flex items-center gap-1"
          >
            続きを読む
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
