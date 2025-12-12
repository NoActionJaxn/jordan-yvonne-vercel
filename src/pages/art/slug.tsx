import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MediaGallery from "../../components/ui/MediaGallery";
import type { StrapiSeo } from "../../types/strapi";
import type { IllustrationItemPageData } from "../../types/loaders";

export default function ArtItemPage() {
  const { siteInfo, illustrationItem } = useLoaderData<IllustrationItemPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...illustrationItem?.seo,
  } as StrapiSeo;

  const mediaItems = (illustrationItem?.images ?? []).map(item => ({
    url: item.url,
    mime: item.mime,
    alt: item.alternativeText,
    poster: item.previewUrl,
  }));

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={illustrationItem?.title} seo={mergedSeo} />
      <main className="px-15 py-10 space-y-10">
        {illustrationItem?.title && (
          <div className="text-center">
            <Heading>{illustrationItem.title}</Heading>
          </div>
        )}
        {illustrationItem?.description && (
          <BlockRenderer content={illustrationItem.description} />
        )}
        {illustrationItem?.images && illustrationItem.images.length > 0 && (
          <MediaGallery items={mediaItems} />
        )}
      </main>
    </>
  );
}