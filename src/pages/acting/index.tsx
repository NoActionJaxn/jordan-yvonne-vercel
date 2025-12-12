import { useLoaderData } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MansoryLayout from "../../components/shared/MansoryLayout";
import ActingCard from "../../components/acting/ActingCard";
import DownloadButton from "../../components/shared/DownloadButton";
import useSetPageCountParam from "../../hooks/useSetPageCountParam";
import { useRevalidator } from "react-router";
import type { ActorPageData } from "../../types/loaders";
import type { StrapiSeo } from "../../types/strapi";

export default function ActingPage() {
  const { siteInfo, actorPage, actorList } = useLoaderData<ActorPageData>();
  const { state: revalidatorState } = useRevalidator();
  const isRefetching = revalidatorState === "loading";

  const mergedSeo = {
    ...siteInfo?.seo,
    ...actorPage?.seo,
  } as StrapiSeo;

  const items = (actorList?.data ?? []).map((item) => ({
    date: item.publishedAt,
    title: item.title,
    slug: item.slug,
    thumb: item.media?.[0]?.url,
    alt: item.media?.[0]?.alternativeText || item.title,
    descText: item.description,
  }));

  useSetPageCountParam({ meta: actorList?.meta });

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={actorPage?.page_title} seo={mergedSeo} />
      <div className="px-16">
        <div className="grid grid-cols-3 gap-10">
          <aside className="grid grid-cols-3 col-span-3 lg:col-span-1 lg:sticky  space-y-5 relative top-20 self-start">
            <div className="col-span-3 md:col-span-2 lg:col-span-3 space-y-5">
              {actorPage?.title && (
                <div>
                  <Heading>{actorPage.title}</Heading>
                </div>
              )}
              {actorPage?.description && (
                <div>
                  <BlockRenderer content={actorPage.description} />
                </div>
              )}
            </div>
            <div className="col-span-3 md:col-span-1 lg:col-span-3 flex lg:justify-start lg:items-start items-center justify-center">
              {actorPage?.resume?.url && (
                <div className="pt-5">
                  <DownloadButton fileUrl={actorPage.resume.url} label="Resume" />
                </div>
              )}
            </div>
          </aside>
          <div className="col-span-3 lg:col-span-2">
            <MansoryLayout
              Component={ActingCard}
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
