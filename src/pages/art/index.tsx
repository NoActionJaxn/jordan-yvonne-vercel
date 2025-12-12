import { useLoaderData, useRevalidator } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MansoryLayout from "../../components/shared/MansoryLayout";
import ArtCard from "../../components/art/ArtCard";
import useSetPageCountParam from "../../hooks/useSetPageCountParam";
import type { IllustratorPageData } from "../../types/loaders";
import type { StrapiSeo } from "../../types/strapi";

export default function ArtPage() {
  const { siteInfo, illustratorPage, illustrationsList } = useLoaderData<IllustratorPageData>();
  const { state: revalidatorState } = useRevalidator();
  const isRefetching = revalidatorState === "loading";

  const mergedSeo = {
    ...siteInfo?.seo,
    ...illustratorPage?.seo,
  } as StrapiSeo;

  const items = (illustrationsList?.data ?? []).map((item) => ({
    date: item.publishedAt,
    title: item.title,
    slug: item.slug,
    thumb: item.images?.[0]?.url,
    alt: item.images?.[0]?.alternativeText || item.title,
    descText: item.description,
  }));

  useSetPageCountParam({ meta: illustrationsList?.meta });

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={illustratorPage?.page_title} seo={mergedSeo} />
      <div className="px-16">
        <div className="grid grid-cols-3 gap-10">
          <aside className="grid grid-cols-3 col-span-3 lg:col-span-1 lg:sticky space-y-5 relative top-20 self-start">
            <div className="col-span-3 md:col-span-2 lg:col-span-3 space-y-5">
              {illustratorPage?.title && (
                <div>
                  <Heading>{illustratorPage.title}</Heading>
                </div>
              )}
              {illustratorPage?.description && (
                <div>
                  <BlockRenderer content={illustratorPage.description} />
                </div>
              )}
            </div>
          </aside>
          <div className="col-span-3 lg:col-span-2">
            <MansoryLayout
              Component={ArtCard}
              data={items}
              keyExtractor={(it) => it.slug}
              isLoading={isRefetching}
            />
          </div>
        </div>
      </div>
    </>
  );
}
