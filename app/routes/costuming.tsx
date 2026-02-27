import { useLoaderData, useNavigation } from "react-router";
import BlockRenderer from "../../src/components/shared/BlockRenderer";
import ProjectCard from "../../src/components/shared/ProjectCard";
import MansoryLayout from "../../src/components/shared/MansoryLayout";
import DownloadButton from "../../src/components/shared/DownloadButton";
import ScrollStatus from "../../src/components/shared/ScrollStatus";
import useSetPageCountParam from "../../src/hooks/useSetPageCountParam";
import { Heading } from "../../src/components/ui/Typeography";
import { buildMetaTags, getParentMeta, getLayoutData } from "../lib/seo";
import {
  fetchDefaultSEO,
  fetchCostumePage,
  fetchCostumes,
  fetchCostumeCount,
  fetchSiteSettings,
} from "../../src/lib/requests";
import type { SiteSettings, CostumePage, Costume } from "../../src/types/requests";
import type { SanitySEO } from "../../src/types/sanity";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  costumes: Costume[];
  totalCostumes: number;
  page?: CostumePage;
}

export async function loader({ request }: { request: Request }) {
  const [rootSeo, page, costumes, totalCostumes, settings] = await Promise.all([
    fetchDefaultSEO(),
    fetchCostumePage(),
    fetchCostumes(request),
    fetchCostumeCount(),
    fetchSiteSettings(),
  ]);

  return { rootSeo, page, costumes, totalCostumes, settings };
}

export function meta({ data, matches }: { data: LoaderData; matches: Array<{ meta?: Record<string, string>[]; data?: unknown }> }) {
  const layoutData = getLayoutData(matches);
  return buildMetaTags({
    siteTitle: data?.settings?.title,
    pageTitle: data?.page?.pageTitle,
    seoSources: [data?.rootSeo, data?.page?.seo],
    favicon: layoutData.settings?.favicon,
    parentMeta: getParentMeta(matches),
  });
}

export default function CostumingPage() {
  const { settings: _settings, rootSeo: _rootSeo, costumes, totalCostumes, page } =
    useLoaderData<LoaderData>();

  const { state: navigationState } = useNavigation();
  const isRefetching = navigationState === "loading";

  const items = (costumes ?? []).map((costume) => ({
    basePath: "/costuming",
    date: costume?._publishedAt,
    title: costume?.title,
    slug: costume?.slug.current,
    thumb: costume?.galleryImages?.[0],
    alt: costume?.title,
    descText: costume?.description,
  }));

  const { isLoadingMore, hasMore } = useSetPageCountParam({
    max: totalCostumes,
    limit: 5,
    loading: isRefetching,
  });

  return (
    <div className="px-16">
      <div className="grid grid-cols-3 gap-10">
        <aside className="grid grid-cols-3 col-span-3 lg:col-span-1 lg:sticky space-y-5 top-20 self-start">
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
          {items.length === 0 && !isRefetching ? (
            <p className="text-center text-gray-500 py-20">No posts available.</p>
          ) : (
            <>
              <MansoryLayout
                Component={ProjectCard}
                data={items}
                keyExtractor={(it) => it.slug}
                isLoading={isRefetching}
              />
              <ScrollStatus isLoadingMore={isLoadingMore} hasMore={hasMore} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
