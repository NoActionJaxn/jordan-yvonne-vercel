import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MediaGallery from "../../components/ui/MediaGallery";
import type { StrapiSeo } from "../../types/strapi";
import type { ActorItemPageData } from "../../types/loaders";

export default function ActorItemPage() {
  const { siteInfo, actorItem } = useLoaderData<ActorItemPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...actorItem?.seo,
  } as StrapiSeo;

  const mediaItems = (actorItem?.media ?? []).map(item => ({
    url: item.url,
    mime: item.mime,
    alt: item.alternativeText,
    poster: item.previewUrl,
  }));

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={actorItem?.title} seo={mergedSeo} />
      <main className="px-15 py-10 space-y-10">
        {actorItem?.title && (
          <div className="text-center">
            <Heading>{actorItem.title}</Heading>
          </div>
        )}
        {actorItem?.description && (
          <BlockRenderer content={actorItem.description} />
        )}
        {actorItem?.media && actorItem.media.length > 0 && (
          <MediaGallery items={mediaItems} />
        )}
      </main>
    </>
  );
}