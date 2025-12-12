import { useLoaderData, useRevalidator } from "react-router";
import Head from "../../components/shared/Head";
import BlockRenderer from "../../components/shared/BlockRenderer";
import { Heading } from "../../components/ui/Typeography";
import MansoryLayout from "../../components/shared/MansoryLayout";
import ArtCard from "../../components/art/ArtCard";
import useSetPageCountParam from "../../hooks/useSetPageCountParam";
import { mergeSeo } from "../../lib/util/mergeSeo";
import type { SiteSettings, IllustrationPage, Illustration } from "../../types/requests";
import type { SanitySEO } from "../../types/sanity";

interface LoaderData {
  settings: SiteSettings;
  rootSeo: SanitySEO;
  illustrations: Illustration[];
  totalIllustrations: number;
  page?: IllustrationPage;
}

export default function ArtPage() {
  const {
    settings,
    rootSeo,
    illustrations,
    totalIllustrations,
    page,
  } = useLoaderData<LoaderData>();

  const { state: revalidatorState } = useRevalidator();

  const isRefetching = revalidatorState === "loading";

  const seo = mergeSeo(rootSeo, page?.seo);

  const items = (illustrations ?? []).map((illustration) => ({
    date: illustration?._publishedAt,
    title: illustration?.title,
    slug: illustration?.slug.current,
    thumb: illustration?.galleryImages?.[0],
    alt: illustration?.title,
    descText: illustration?.description,
  }));

  useSetPageCountParam({ max: totalIllustrations, limit: 5 });

  return (
    <>
      <Head siteTitle={settings?.title} pageTitle={page?.pageTitle} seo={seo} />
      <div className="px-16">
        <div className="grid grid-cols-3 gap-10">
          <aside className="grid grid-cols-3 col-span-3 lg:col-span-1 lg:sticky space-y-5 relative top-20 self-start">
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
              Component={ArtCard}
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
