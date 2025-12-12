import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MediaGallery from "../../components/ui/MediaGallery";
import { mergeSeo } from "../../lib/util/mergeSeo";
import type { SanitySEO } from "../../types/sanity";
import type { Actor, SiteSettings } from "../../types/requests";

export interface LoaderData {
  rootSeo: SanitySEO;
  actingSeo: SanitySEO;
  page: Actor;
  settings: SiteSettings;
}

export default function ActorItemPage() {
  const {
    rootSeo,
    actingSeo,
    page,
    settings
  } = useLoaderData<LoaderData>();

  const seo = mergeSeo(rootSeo, actingSeo, page?.seo);

  return (
    <>
      <Head siteTitle={settings?.title} pageTitle={page?.title} seo={seo} />
      <main className="px-15 py-10 space-y-10">
        {page?.title && (
          <div className="text-center">
            <Heading>{page.title}</Heading>
          </div>
        )}
        {page?.description && (
          <BlockRenderer content={page.description} />
        )}
        {page?.galleryImages && page.galleryImages.length > 0 && (
          <MediaGallery items={page.galleryImages} />
        )}
      </main>
    </>
  );
}