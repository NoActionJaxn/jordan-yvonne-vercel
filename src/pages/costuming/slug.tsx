import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MediaGallery from "../../components/ui/MediaGallery";
import type { SanitySEO } from "../../types/sanity";
import type { Costume, SiteSettings } from "../../types/requests";
import { mergeSeo } from "../../lib/util/mergeSeo";
import { imageBuilder } from "../../lib/util/imageBuilder";

interface LoaderData {
  rootSeo: SanitySEO;
  costumeSeo: SanitySEO;
  settings: SiteSettings;
  page: Costume;
}

export default function CostumeItemPage() {
  const {
    rootSeo,
    costumeSeo,
    settings,
    page,
  } = useLoaderData<LoaderData>();

  const seo = mergeSeo(rootSeo, costumeSeo, page?.seo);

  const mediaItems = (page.galleryImages ?? []).map(image => {
    const sanityImage = imageBuilder(image)
    const source = sanityImage.options.source as { _type?: string } | undefined;

    return {
      url: sanityImage.url(),
      mime: source?._type ?? 'image/jpeg',
      alt: "Gallery image for " + (page?.title ?? ""),
      thumb: sanityImage.width(400).url(),
    }
  });

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
          <MediaGallery items={mediaItems} />
        )}
      </main>
    </>
  )
}
