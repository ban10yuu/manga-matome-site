import { Article, MangaInfo, CATEGORY_LABELS } from '@/lib/types';

const SITE_NAME = 'マンガ考察ラボ';
const SITE_URL = 'https://manga-matome-site.vercel.app';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

/** Article JSON-LD for article pages */
export function ArticleJsonLd({
  article,
  mangaTitle,
}: {
  article: Article;
  mangaTitle: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/article/${article.slug}`,
    },
    about: {
      '@type': 'CreativeWork',
      name: mangaTitle,
    },
    keywords: article.tags.join(', '),
    articleSection: CATEGORY_LABELS[article.category],
    inLanguage: 'ja',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** BreadcrumbList JSON-LD */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQ JSON-LD - generates FAQ from article sections */
export function FaqJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  if (questions.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Convert article sections into FAQ questions */
export function buildFaqFromSections(
  sections: { heading: string; content: string }[],
  mangaTitle: string
): { question: string; answer: string }[] {
  const questionPatterns = /[？?]|^(なぜ|どう|何|いつ|どこ|誰|どの|どれ|どんな|どういう)/;

  return sections.map((section) => {
    const heading = section.heading;
    const question = questionPatterns.test(heading)
      ? heading
      : `${mangaTitle}における「${heading}」とは？`;

    const plainContent = stripHtml(section.content.replace(/\n\n/g, ' '));
    const answer =
      plainContent.length > 200
        ? plainContent.slice(0, 200) + '...'
        : plainContent;

    return { question, answer };
  });
}

/** CollectionPage JSON-LD for manga index pages */
export function MangaPageJsonLd({
  manga,
  articleCount,
}: {
  manga: MangaInfo;
  articleCount: number;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${manga.title}の考察・ネタバレまとめ`,
    description: `${manga.title}（${manga.author}）の考察・伏線・キャラクター分析記事一覧。${manga.description}`,
    url: `${SITE_URL}/manga/${manga.slug}`,
    mainEntity: {
      '@type': 'CreativeWork',
      name: manga.title,
      alternateName: manga.titleEn,
      author: {
        '@type': 'Person',
        name: manga.author,
      },
      genre: manga.genre.join(', '),
    },
    numberOfItems: articleCount,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'ja',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
