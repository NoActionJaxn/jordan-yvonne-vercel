import { useLoaderData, useRevalidator } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import CostumingCard from "../../components/costumes/CostumingCard";
import MansoryLayout from "../../components/shared/MansoryLayout";
import DownloadButton from "../../components/shared/DownloadButton";
import useSetPageCountParam from "../../hooks/useSetPageCountParam";
import { Heading } from "../../components/ui/Typeography";
import { mergeSeo } from "../../lib/util/mergeSeo";
import type { SiteSettings, CostumePage, Costume } from "../../types/requests";
import type { SanitySEO } from "../../types/sanity";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  costumes: Costume[];
  totalCostumes: number;
  page?: CostumePage;
}

export default function CostumingPage() {
  const {
    settings,
    rootSeo,
    costumes,
    totalCostumes,
    page,
  } = useLoaderData<LoaderData>();

  const { state: revalidatorState } = useRevalidator();

  const isRefetching = revalidatorState === "loading";

  const seo = mergeSeo(rootSeo, page?.seo);

  const items = (costumes ?? []).map((costume) => ({
    date: costume?._publishedAt,
    title: costume?.title,
    slug: costume?.slug.current,
    thumb: costume?.galleryImages?.[0],
    alt: costume?.title,
    descText: costume?.description,
  }));

  useSetPageCountParam({ max: totalCostumes, limit: 5 });

  return (
    <>
      <Head siteTitle={settings?.title} pageTitle={page?.pageTitle} seo={seo} />
      <div className="px-16">
        <div className="grid grid-cols-3 gap-10">
          <aside className="grid grid-cols-3 col-span-3 lg:col-span-1 lg:sticky  space-y-5 relative top-20 self-start">
            <div className="col-span-3 md:col-span-2 lg:col-span-3 space-y-5">
              {page && (
                <div>
                  <Heading>{page.title}</Heading>
                </div>
              )}
              {page?.description && (
                <div>
                  <BlockRenderer content={page.description} />
                </div>
              )}
            </div>
            <div className="col-span-3 md:col-span-1 lg:col-span-3 flex lg:justify-start lg:items-start items-center justify-center">
              {page?.resumeFile && (
                <div className="pt-5">
                  <DownloadButton fileUrl={page.resumeFile} label="Resume" />
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
