import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import Image from "../../components/ui/Image";
import BlockRendererClient from "../../components/shared/BlockRendererClient";
import type { StrapiSeo } from "../../types/strapi";
import type { CostumeItemPageData } from "../../lib/loaders";

export default function CostumeItemPage() {
  const {
    siteInfo,
    costumeItem,
  } = useLoaderData<CostumeItemPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...costumeItem?.seo,
  } as StrapiSeo;

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={costumeItem?.title} seo={mergedSeo} />
      <main className="px-16 py-8 space-y-8">
        {costumeItem?.title && (
          <div className="text-center">
            <h1 className="text-5xl font-cursive font-bold mb-5 capitalize">{costumeItem.title}</h1>
          </div>
        )}
        {costumeItem?.description && (
          <BlockRendererClient content={costumeItem.description} />
        )}
        {costumeItem?.media && costumeItem.media.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {costumeItem.media.map((mediaItem) => (
              <div key={mediaItem.id} className="w-full">
                <Image
                  src={mediaItem.url}
                  alt={mediaItem.alternativeText || costumeItem.title}
                  className="w-auto h-auto rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
