import Head from "../components/shared/Head";
import { mergeSeo } from "../lib/util/mergeSeo";
import { useLoaderData } from "react-router";
import BlockRenderer from "../components/shared/BlockRenderer";
import type { SanitySEO } from "../types/sanity";
import type { LandingPage, SiteSettings } from "../types/requests";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  page?: LandingPage;
}

export default function IndexPage() {
  const {
    rootSeo,
    page,
    settings,
  } = useLoaderData<LoaderData>();

  const seo = mergeSeo(
    rootSeo,
    page?.seo,
  );

  return (
    <>
      <Head siteTitle={settings?.title} pageTitle={page?.page_title} seo={seo} />
      <div className="text-center pb-10 px-10 sm:px-2 max-w-7xl mx-auto">
        {page?.description && (
          <BlockRenderer content={page.description} />
        )}
      </div>
    </>
  );
}
