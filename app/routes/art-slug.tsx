import { useLoaderData } from "react-router";
import BlockRenderer from "../../src/components/shared/BlockRenderer";
import { Heading } from "../../src/components/ui/Typeography";
import MediaGallery from "../../src/components/ui/MediaGallery";
import { buildMetaTags, getParentMeta, getLayoutData } from "../lib/seo";
import {
  fetchDefaultSEO,
  fetchIllustrationPageSEO,
  fetchIllustrationBySlug,
  fetchSiteSettings,
} from "../../src/lib/requests";
import type { SanitySEO } from "../../src/types/sanity";
import type { Illustration, SiteSettings } from "../../src/types/requests";

interface LoaderData {
  rootSeo: SanitySEO;
  illustrationSeo: SanitySEO;
  page: Illustration;
  settings: SiteSettings;
}

export async function loader({ params }: { params: { slug: string } }) {
  const [rootSeo, illustrationSeo, page, settings] = await Promise.all([
    fetchDefaultSEO(),
    fetchIllustrationPageSEO(),
    fetchIllustrationBySlug(params.slug ?? ""),
    fetchSiteSettings(),
  ]);

  return { rootSeo, illustrationSeo, page, settings };
}

export function meta({ data, matches }: { data: LoaderData; matches: Array<{ meta?: Record<string, string>[]; data?: unknown }> }) {
  const layoutData = getLayoutData(matches);
  return buildMetaTags({
    siteTitle: data?.settings?.title,
    pageTitle: data?.page?.title,
    seoSources: [data?.rootSeo, data?.illustrationSeo, data?.page?.seo],
    favicon: layoutData.settings?.favicon,
    parentMeta: getParentMeta(matches),
  });
}

export default function ArtItemPage() {
  const { page } = useLoaderData<LoaderData>();

  return (
    <main className="px-15 py-10 space-y-10">
      {page?.title && (
        <div className="text-center">
          <Heading>{page.title}</Heading>
        </div>
      )}
      {page?.description && (
        <BlockRenderer content={page.description} withStyles />
      )}
      {page?.galleryImages && page.galleryImages.length > 0 && (
        <MediaGallery items={page.galleryImages} />
      )}
    </main>
  );
}
