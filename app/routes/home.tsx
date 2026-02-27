import { useLoaderData } from "react-router";
import BlockRenderer from "../../src/components/shared/BlockRenderer";
import { buildMetaTags, getParentMeta, getLayoutData } from "../lib/seo";
import {
  fetchDefaultSEO,
  fetchLandingPage,
  fetchSiteSettings,
} from "../../src/lib/requests";
import type { SanitySEO } from "../../src/types/sanity";
import type { LandingPage, SiteSettings } from "../../src/types/requests";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  page?: LandingPage;
}

export async function loader() {
  const [rootSeo, page, settings] = await Promise.all([
    fetchDefaultSEO(),
    fetchLandingPage(),
    fetchSiteSettings(),
  ]);

  return { rootSeo, page, settings };
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

export default function HomePage() {
  const { page } = useLoaderData<LoaderData>();

  return (
    <div className="text-center pb-10 px-10 sm:px-2 max-w-5xl mx-auto">
      {page?.description && <BlockRenderer content={page.description} />}
    </div>
  );
}
