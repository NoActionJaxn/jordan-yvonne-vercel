import type { SanitySEO } from "../../types/sanity";

type PartialSEO = Partial<SanitySEO> | null | undefined;

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
    const { ...rest } = src;
    const filtered = Object.fromEntries(
      Object.entries(rest).filter(([, v]) => v !== undefined && v !== null && v !== "")
    );
    return { ...acc, ...filtered };
  }, {});

  return merged as SanitySEO;
}
