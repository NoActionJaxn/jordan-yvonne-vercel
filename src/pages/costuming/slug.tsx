import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MediaGallery from "../../components/ui/MediaGallery";
import type { StrapiSeo } from "../../types/strapi";
import type { CostumeItemPageData } from "../../types/loaders";

export default function CostumeItemPage() {
  const {
    siteInfo,
    costumeItem,
  } = useLoaderData<CostumeItemPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...costumeItem?.seo,
  } as StrapiSeo;

  const mediaItems = (costumeItem?.media ?? []).map(item => ({
    url: item.url,
    mime: item.mime,
    alt: item.alternativeText,
    poster: item.previewUrl,
  }));

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={costumeItem?.title} seo={mergedSeo} />
      <main className="px-15 py-10 space-y-10">
        {costumeItem?.title && (
          <div className="text-center">
            <Heading>{costumeItem.title}</Heading>
          </div>
        )}
        {costumeItem?.description && (
          <BlockRenderer content={costumeItem.description} />
        )}
        {costumeItem?.media && costumeItem.media.length > 0 && (
          <MediaGallery items={mediaItems} />
        )}
      </main>
    </>
  )
}
