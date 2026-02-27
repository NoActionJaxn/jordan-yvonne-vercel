import { useLoaderData, useRevalidator } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MansoryLayout from "../../components/shared/MansoryLayout";
import ProjectCard from "../../components/shared/ProjectCard";
import DownloadButton from "../../components/shared/DownloadButton";
import useSetPageCountParam from "../../hooks/useSetPageCountParam";
import ScrollStatus from "../../components/shared/ScrollStatus";
import { mergeSeo } from "../../lib/util/mergeSeo";
import type { SiteSettings, ActingPage, Actor } from "../../types/requests";
import type { SanitySEO } from "../../types/sanity";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  actors: Actor[];
  totalActors: number;
  page?: ActingPage;
}

export default function ActingPageComponent() {
  const {
    settings,
    rootSeo,
    actors,
    totalActors,
    page,
  } = useLoaderData<LoaderData>();

  const { state: revalidatorState } = useRevalidator();

  const isRefetching = revalidatorState === "loading";

  const seo = mergeSeo(rootSeo, page?.seo);

  const items = (actors ?? []).map((actor) => ({
    basePath: "/acting",
    date: actor?._publishedAt,
    title: actor?.title,
    slug: actor?.slug.current,
    thumb: actor?.galleryImages?.[0],
    alt: actor?.title,
    descText: actor?.description,
  }));

  const { isLoadingMore, hasMore } = useSetPageCountParam({ max: totalActors, limit: 5, loading: isRefetching });

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
              Component={ProjectCard}
              data={items}
              keyExtractor={(it) => it.slug}
              isLoading={isRefetching}
            />
            <ScrollStatus isLoadingMore={isLoadingMore} hasMore={hasMore} />
          </div>
        </div>
      </div>
    </>
  );
}
