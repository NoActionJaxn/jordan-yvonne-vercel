import { useLoaderData, useNavigation } from "react-router";
import BlockRenderer from "../../src/components/shared/BlockRenderer";
import { Heading } from "../../src/components/ui/Typeography";
import MansoryLayout from "../../src/components/shared/MansoryLayout";
import ProjectCard from "../../src/components/shared/ProjectCard";
import ScrollStatus from "../../src/components/shared/ScrollStatus";
import useSetPageCountParam from "../../src/hooks/useSetPageCountParam";
import { mergeSeo } from "../../src/lib/util/mergeSeo";
import { titleBuilder } from "../../src/lib/titleBuilder";
import { imageBuilder } from "../../src/lib/util/imageBuilder";
import {
  fetchDefaultSEO,
  fetchIllustrationPage,
  fetchIllustrations,
  fetchIllustrationCount,
  fetchSiteSettings,
} from "../../src/lib/requests";
import type { SiteSettings, IllustrationPage, Illustration } from "../../src/types/requests";
import type { SanitySEO } from "../../src/types/sanity";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  illustrations: Illustration[];
  totalIllustrations: number;
  page?: IllustrationPage;
}

export async function loader({ request }: { request: Request }) {
  const [rootSeo, page, illustrations, totalIllustrations, settings] =
    await Promise.all([
      fetchDefaultSEO(),
      fetchIllustrationPage(),
      fetchIllustrations(request),
      fetchIllustrationCount(),
      fetchSiteSettings(),
    ]);

  return { rootSeo, page, illustrations, totalIllustrations, settings };
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
  }
  if (seo?.metaImage) {
    try {
      const imgUrl = imageBuilder(seo.metaImage).url();
      tags.push({ property: "og:image", content: imgUrl });
    } catch { /* ignore */ }
  }
  tags.push({ name: "twitter:card", content: "summary_large_image" });

  return tags;
}

export default function ArtPage() {
  const { illustrations, totalIllustrations, page } =
    useLoaderData<LoaderData>();

  const { state: navigationState } = useNavigation();
  const isRefetching = navigationState === "loading";

  const items = (illustrations ?? []).map((illustration) => ({
    basePath: "/art",
    date: illustration?._publishedAt,
    title: illustration?.title,
    slug: illustration?.slug.current,
    thumb: illustration?.galleryImages?.[0],
    alt: illustration?.title,
    descText: illustration?.description,
  }));

  const { isLoadingMore, hasMore } = useSetPageCountParam({
    max: totalIllustrations,
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
  );
}
