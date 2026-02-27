import { useLoaderData } from "react-router";
import BlockRenderer from "../../src/components/shared/BlockRenderer";
import { mergeSeo } from "../../src/lib/util/mergeSeo";
import { titleBuilder } from "../../src/lib/titleBuilder";
import { imageBuilder } from "../../src/lib/util/imageBuilder";
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

export function meta({ data }: { data: LoaderData }) {
  const seo = mergeSeo(data?.rootSeo, data?.page?.seo);
  const title = titleBuilder({
    siteTitle: data?.settings?.title,
    pageTitle: data?.page?.pageTitle,
  });

  const tags: Array<Record<string, string>> = [{ title }];

  if (seo?.metaDescription) {
    tags.push({ name: "description", content: seo.metaDescription });
    tags.push({ property: "og:description", content: seo.metaDescription });
    tags.push({ name: "twitter:description", content: seo.metaDescription });
  }
  if (seo?.metaTitle) {
    tags.push({ property: "og:site_name", content: seo.metaTitle });
    tags.push({ name: "twitter:title", content: seo.metaTitle });
  }
  if (data?.page?.pageTitle) {
    tags.push({ property: "og:title", content: data.page.pageTitle });
  }
  if (seo?.metaImage) {
    try {
      const imgUrl = imageBuilder(seo.metaImage).url();
      tags.push({ property: "og:image", content: imgUrl });
      tags.push({ name: "twitter:image", content: imgUrl });
    } catch { /* ignore */ }
  }
  if (seo?.type) tags.push({ property: "og:type", content: seo.type });
  tags.push({ name: "twitter:card", content: "summary_large_image" });

  return tags;
}

export default function HomePage() {
  const { page } = useLoaderData<LoaderData>();

  return (
    <div className="text-center pb-10 px-10 sm:px-2 max-w-5xl mx-auto">
      {page?.description && <BlockRenderer content={page.description} />}
    </div>
  );
}
