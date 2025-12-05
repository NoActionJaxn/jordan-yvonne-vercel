import { useLoaderData } from "react-router";
import Head from "../components/shared/Head";
import type { LandingPageData } from "../lib/loaders";
import BlockRendererClient from "../components/shared/BlockRendererClient";
import type { StrapiSeo } from "../types/strapi";

export default function IndexPage() {
  const {
    siteInfo,
    landingPage,
  } = useLoaderData<LandingPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...landingPage?.seo,
  } as StrapiSeo;

  return (
    <>
    <Head siteTitle={siteInfo?.title} pageTitle={landingPage?.page_title} seo={mergedSeo} />
      <div className="text-center pb-10">
        {landingPage?.description && (
          <BlockRendererClient content={landingPage.description} />
        )}
      </div>
    </>
  )
}
