import fs from 'fs';
import path from 'path';

const imageDir = path.join(process.cwd(), 'public', 'images', 'manga');

// Build時に一度だけチェックしてキャッシュ
const imageCache = new Set<string>();
try {
  if (fs.existsSync(imageDir)) {
    for (const file of fs.readdirSync(imageDir)) {
      const slug = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      imageCache.add(slug);
    }
  }
} catch {
  // ignore
}

export function mangaHasImage(mangaSlug: string): boolean {
  return imageCache.has(mangaSlug);
}

export function getMangaImagePath(mangaSlug: string): string | null {
  if (imageCache.has(mangaSlug)) {
    return `/images/manga/${mangaSlug}.jpg`;
  }
  return null;
}
