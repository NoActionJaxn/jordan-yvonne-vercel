import { useLoaderData } from "react-router";
import BlockRenderer from "../../src/components/shared/BlockRenderer";
import { Heading } from "../../src/components/ui/Typeography";
import MediaGallery from "../../src/components/ui/MediaGallery";
import { mergeSeo } from "../../src/lib/util/mergeSeo";
import { titleBuilder } from "../../src/lib/titleBuilder";
import { imageBuilder } from "../../src/lib/util/imageBuilder";
import {
  fetchDefaultSEO,
  fetchActingPageSEO,
  fetchActorBySlug,
  fetchSiteSettings,
} from "../../src/lib/requests";
import type { SanitySEO } from "../../src/types/sanity";
import type { Actor, SiteSettings } from "../../src/types/requests";

interface LoaderData {
  rootSeo: SanitySEO;
  actingSeo: SanitySEO;
  page: Actor;
  settings: SiteSettings;
}

export async function loader({ params }: { params: { slug: string } }) {
  const [rootSeo, actingSeo, page, settings] = await Promise.all([
    fetchDefaultSEO(),
    fetchActingPageSEO(),
    fetchActorBySlug(params.slug ?? ""),
    fetchSiteSettings(),
  ]);

  return { rootSeo, actingSeo, page, settings };
}

export function meta({ data }: { data: LoaderData }) {
  const seo = mergeSeo(data?.rootSeo, data?.actingSeo, data?.page?.seo);
  const title = titleBuilder({
    siteTitle: data?.settings?.title,
    pageTitle: data?.page?.title,
  });

  const tags: Array<Record<string, string>> = [{ title }];
  if (seo?.metaDescription) {
    tags.push({ name: "description", content: seo.metaDescription });
    tags.push({ property: "og:description", content: seo.metaDescription });
  }
  if (data?.page?.title) {
    tags.push({ property: "og:title", content: data.page.title });
  }
  if (seo?.metaImage) {
    try {
      const imgUrl = imageBuilder(seo.metaImage).url();
      tags.push({ property: "og:image", content: imgUrl });
    } catch { /* ignore */ }
  }
  tags.push({ name: "twitter:card", content: "summary_large_image" });

  return tags;
}

export default function ActorItemPage() {
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
