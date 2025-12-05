import { useLoaderData, useRevalidator } from "react-router";
import Head from "../../components/shared/Head";
import BlockRendererClient from "../../components/shared/BlockRendererClient";
import CostumingCard from "../../components/costumes/CostumingCard";
import MansoryLayout from "../../components/shared/MansoryLayout";
import DownloadButton from "../../components/shared/DownloadButton";
import useSetPageCountParam from "../../hooks/useSetPageCountParam";
import type { CostumingPageData } from "../../lib/loaders";
import type { StrapiSeo } from "../../types/strapi";
import { Heading } from "../../components/ui/Typeography";

export default function CostumingPage() {
  const {
    siteInfo,
    costumePage,
    costumeList,
  } = useLoaderData<CostumingPageData>();

  const { state: revalidatorState } = useRevalidator();

  const isRefetching = revalidatorState === "loading";

  const mergedSeo = {
    ...siteInfo?.seo,
    ...costumePage?.seo,
  } as StrapiSeo;

  const items = (costumeList?.data ?? []).map((item) => ({
    date: item.publishedAt,
    title: item.title,
    slug: item.slug,
    thumb: item.media?.[0]?.url,
    alt: item.media?.[0]?.alternativeText || item.title,
    descText: item.description,
  }));

  useSetPageCountParam({ meta: costumeList?.meta });

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={costumePage?.page_title} seo={mergedSeo} />
      <div className="px-16">
        <div className="grid grid-cols-3 gap-10">
          <aside className="grid grid-cols-3 col-span-3 lg:col-span-1 lg:sticky  space-y-5 relative top-20 self-start">
            <div className="col-span-3 md:col-span-2 lg:col-span-3 space-y-5">
              {costumePage?.title && (
                <div>
                  <Heading>{costumePage.title}</Heading>
                </div>
              )}
              {costumePage?.description && (
                <div>
                  <BlockRendererClient content={costumePage.description} />
                </div>
              )}
            </div>
            <div className="col-span-3 md:col-span-1 lg:col-span-3 flex lg:justify-start lg:items-start items-center justify-center">
              {costumePage?.resume?.url && (
                <div className="pt-5">
                  <DownloadButton fileUrl={costumePage.resume.url} label="Resume" />
                </div>
              )}
            </div>
          </aside>
          <div className="col-span-3 lg:col-span-2">
            <MansoryLayout
              Component={CostumingCard}
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
