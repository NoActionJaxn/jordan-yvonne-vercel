import type { SanitySEO, SanityOpenGraph } from "../../types/sanity";

type PartialSEO = Partial<SanitySEO> | null | undefined;

/**
 * Deep merge OpenGraph objects, with later values overwriting earlier ones.
 */
function mergeOpenGraph(...sources: (Partial<SanityOpenGraph> | null | undefined)[]): SanityOpenGraph | undefined {
  const filtered = sources.filter(Boolean) as Partial<SanityOpenGraph>[];
  if (filtered.length === 0) return undefined;

  return filtered.reduce<SanityOpenGraph>((acc, src) => {
    return {
      ...acc,
      ...Object.fromEntries(
        Object.entries(src).filter(([, v]) => v !== undefined && v !== null && v !== "")
      ),
    } as SanityOpenGraph;
  }, {} as SanityOpenGraph);
}

/**
 * Merge SEO objects with priority: page > category > site.
 * Later arguments overwrite earlier ones.
 * Undefined/null/empty values are skipped so they don't overwrite valid data.
 *
 * @param site - Site-level default SEO
 * @param category - Category/section-level SEO (e.g., costumePage, actingPage)
 * @param page - Page-level SEO (e.g., individual costume item)
 * @returns Merged SEO object
 *
 * @example
 * const seo = mergeSeo(siteInfo?.seo, costumePage?.seo, costumeItem?.seo);
 */
export function mergeSeo(
  site?: PartialSEO,
  category?: PartialSEO,
  page?: PartialSEO
): SanitySEO {
  const sources = [site, category, page].filter(Boolean) as Partial<SanitySEO>[];

  // Merge top-level SEO fields
  const merged = sources.reduce<Partial<SanitySEO>>((acc, src) => {
    const { openGraph, ...rest } = src;
    const filtered = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined && v !== null && v !== "")
    );
    return { ...acc, ...filtered };
  }, {});

  // Merge nested openGraph separately
  const mergedOg = mergeOpenGraph(site?.openGraph, category?.openGraph, page?.openGraph);
  if (mergedOg && Object.keys(mergedOg).length > 0) {
    merged.openGraph = mergedOg;
  }

  return merged as SanitySEO;
}

export default mergeSeo;
