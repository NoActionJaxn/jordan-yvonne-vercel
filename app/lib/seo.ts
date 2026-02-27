import type { SanitySEO } from "../../src/types/sanity";
import type { SiteSettings } from "../../src/types/requests";
import { titleBuilder } from "../../src/lib/titleBuilder";
import { imageBuilder } from "../../src/lib/util/imageBuilder";
import { mergeSeo } from "../../src/lib/util/mergeSeo";
import type { SanityImageSource } from "@sanity/image-url";

type MetaDescriptor = Record<string, string>;

interface BuildMetaTagsOptions {
  siteTitle?: string;
  pageTitle?: string;
  seoSources: Array<Partial<SanitySEO> | null | undefined>;
  favicon?: SanityImageSource;
  /** Parent meta tags from matches — these are merged in so parent tags are preserved */
  parentMeta?: MetaDescriptor[];
}

/**
 * Builds a complete set of meta tags matching what Head.tsx produced.
 * Merges parent layout meta so child routes don't drop global tags.
 */
export function buildMetaTags({
  siteTitle,
  pageTitle,
  seoSources,
  favicon,
  parentMeta = [],
}: BuildMetaTagsOptions): MetaDescriptor[] {
  const seo = mergeSeo(...seoSources);
  const title = titleBuilder({ siteTitle, pageTitle });

  // Start with parent meta tags (from layout), then override/extend
  // Filter out title from parent since child provides its own
  const inherited = parentMeta.filter((tag) => !("title" in tag));

  const tags: MetaDescriptor[] = [...inherited, { title }];

  // Charset & language (always present, with defaults)
  tags.push({ name: "charset", content: seo?.metaCharset || "UTF-8" });
  tags.push({ name: "language", content: seo?.metaLanguage || "en-US" });

  // Core SEO
  if (seo?.metaDescription) tags.push({ name: "description", content: seo.metaDescription });
  if (seo?.metaKeywords?.length) tags.push({ name: "keywords", content: seo.metaKeywords.join(", ") });
  if (seo?.metaAuthor) tags.push({ name: "author", content: seo.metaAuthor });
  if (seo?.metaRobots) tags.push({ name: "robots", content: seo.metaRobots });
  if (seo?.metaTitle) tags.push({ property: "title", content: seo.metaTitle });

  // Image meta
  if (seo?.metaImage) {
    try {
      const imgUrl = imageBuilder(seo.metaImage).url();
      tags.push({ name: "image", content: imgUrl });
    } catch { /* ignore */ }
  }

  // Favicon (shortcut icon, apple-touch-icon)
  if (favicon) {
    try {
      const faviconUrl = imageBuilder(favicon).url();
      tags.push({ tagName: "link", rel: "icon", type: "image/svg+xml", href: faviconUrl });
      tags.push({ tagName: "link", rel: "shortcut icon", href: faviconUrl });
      tags.push({ tagName: "link", rel: "apple-touch-icon", href: faviconUrl });
    } catch { /* ignore */ }
  }

  // Canonical
  if (seo?.canonicalURL) {
    tags.push({ tagName: "link", rel: "canonical", href: seo.canonicalURL });
  }

  // Open Graph
  if (seo?.type) tags.push({ property: "og:type", content: seo.type });
  if (seo?.canonicalURL) tags.push({ property: "og:see_also", content: seo.canonicalURL });
  if (seo?.metaTitle) tags.push({ property: "og:site_name", content: seo.metaTitle });
  if (pageTitle) tags.push({ property: "og:title", content: pageTitle });
  if (seo?.metaDescription) tags.push({ property: "og:description", content: seo.metaDescription });
  if (seo?.metaImage) {
    try {
      const imgUrl = imageBuilder(seo.metaImage).url();
      tags.push({ property: "og:image", content: imgUrl });
    } catch { /* ignore */ }
  }

  // Twitter
  tags.push({ name: "twitter:card", content: "summary_large_image" });
  if (seo?.metaDescription) tags.push({ name: "twitter:description", content: seo.metaDescription });
  if (seo?.metaTitle) tags.push({ name: "twitter:title", content: seo.metaTitle });
  if (seo?.metaImage) {
    try {
      const imgUrl = imageBuilder(seo.metaImage).url();
      tags.push({ name: "twitter:image", content: imgUrl });
    } catch { /* ignore */ }
  }
  if (seo?.canonicalURL) tags.push({ name: "twitter:url", content: seo.canonicalURL });

  // Structured Data (JSON-LD)
  if (seo?.structuredData) {
    tags.push({ "script:ld+json": JSON.stringify(seo.structuredData) });
  }

  return deduplicateMeta(tags);
}

/**
 * Deduplicate meta tags — later entries win over earlier ones.
 * Keyed by: `title`, `name`, `property`, or `tagName+rel`.
 */
function deduplicateMeta(tags: MetaDescriptor[]): MetaDescriptor[] {
  const seen = new Map<string, number>();

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const key =
      "title" in tag ? "title" :
      tag.name ? `name:${tag.name}` :
      tag.property ? `property:${tag.property}` :
      tag.tagName && tag.rel ? `link:${tag.rel}` :
      "script:ld+json" in tag ? "script:ld+json" :
      null;

    if (key) {
      seen.set(key, i);
    }
  }

  // Keep only the last occurrence of each keyed tag, plus all un-keyed tags
  const lastIndices = new Set(seen.values());
  return tags.filter((_, i) => {
    const tag = tags[i];
    const key =
      "title" in tag ? "title" :
      tag.name ? `name:${tag.name}` :
      tag.property ? `property:${tag.property}` :
      tag.tagName && tag.rel ? `link:${tag.rel}` :
      "script:ld+json" in tag ? "script:ld+json" :
      null;

    // Un-keyed tags always pass; keyed tags only if they're the last occurrence
    return key === null || lastIndices.has(i);
  });
}

/**
 * Extract parent meta tags from route matches (for merging in child routes).
 */
export function getParentMeta(
  matches: Array<{ meta?: MetaDescriptor[] }>,
): MetaDescriptor[] {
  // Get meta from all parent matches (everything except the last match which is the current route)
  return matches
    .slice(0, -1)
    .flatMap((match) => match.meta ?? []);
}

/**
 * Helper to extract layout loader data from matches (for favicon/settings access in child routes).
 */
export function getLayoutData(
  matches: Array<{ data?: unknown }>,
): { settings?: SiteSettings; seo?: SanitySEO } {
  // Layout is typically the second match (after root)
  for (const match of matches) {
    const data = match.data as Record<string, unknown> | undefined;
    if (data && "settings" in data) {
      return {
        settings: data.settings as SiteSettings | undefined,
        seo: data.seo as SanitySEO | undefined,
      };
    }
  }
  return {};
}
