import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRendererClient from "../../components/shared/BlockRendererClient";
import type { StrapiSeo } from "../../types/strapi";
import type { CostumeItemPageData } from "../../lib/loaders";
import { Heading } from "../../components/ui/Typeography";
import MediaGallery from "../../components/ui/MediaGallery";

export default function CostumeItemPage() {
  const {
    siteInfo,
    costumeItem,
  } = useLoaderData<CostumeItemPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...costumeItem?.seo,
  } as StrapiSeo;

  console.log({ costumeItem });

  const mediaItems = (costumeItem?.media ?? []).map(item => ({
    url: item.url,
    mime: item.mime,
    alt: item.alternativeText,
    poster: item.previewUrl,
  }));

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={costumeItem?.title} seo={mergedSeo} />
      <main className="px-16 py-8 space-y-8">
        {costumeItem?.title && (
          <div className="text-center">
            <Heading>{costumeItem.title}</Heading>
          </div>
        )}
        {costumeItem?.description && (
          <BlockRendererClient content={costumeItem.description} />
        )}
        {costumeItem?.media && costumeItem.media.length > 0 && (
          <MediaGallery items={mediaItems} />
        )}
      </main>
    </>
  )
}
