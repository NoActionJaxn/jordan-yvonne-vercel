import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router";
import { motion } from "motion/react";
import debounce from "lodash.debounce";
import Head from "../../components/shared/Head";
import BlockRendererClient from "../../components/shared/BlockRendererClient";
import type { CostumingPageData } from "../../lib/loaders";
import type { StrapiSeo } from "../../types/strapi";
import { STRAPI_URL } from "../../constants/strapi";
import CostumingCard from "../../components/costumes/CostumingCard";

export default function CostumingPage() {
  const {
    siteInfo,
    costumePage,
    costumeList,
  } = useLoaderData<CostumingPageData>();

  const mergedSeo = {
    ...siteInfo?.seo,
    ...costumePage?.seo,
  } as StrapiSeo;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Number(searchParams.get("pageCount") ?? 1);
  const totalResults = costumeList?.meta.pagination.total ?? 0;
  const resultsPerPage = costumeList?.meta.pagination.pageSize ?? 10;

  console.log({ pageCount, totalResults, resultsPerPage });

  const handleScroll = useCallback(() => {
    const scrollPos = window.innerHeight + window.scrollY;
    const bottom = document.documentElement.scrollHeight - 50;

    if (scrollPos >= bottom) {
      const hasMore = pageCount * resultsPerPage < totalResults;

      if (hasMore) {
        const next = pageCount + 1;
        setSearchParams({ pageCount: String(next) }, { replace: true });
      }
    }
  }, [pageCount, resultsPerPage, totalResults, setSearchParams]);

  // Debounce scroll handler using lodash.debounce
  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 200), [handleScroll]);
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      debouncedHandleScroll.cancel?.();
    };
  }, [debouncedHandleScroll]);

  const list = costumeList?.data ?? [];
  const [left, setLeft] = useState<typeof list>([] as any);
  const [right, setRight] = useState<typeof list>([] as any);

  useEffect(() => {
    const l: typeof list = [] as any;
    const r: typeof list = [] as any;
    list.forEach((item, idx) => {
      (idx % 2 === 0 ? l : r).push(item);
    });
    setLeft(l);
    setRight(r);
  }, [list]);

  return (
    <>
      <Head siteTitle={siteInfo?.title} pageTitle={costumePage?.page_title} seo={mergedSeo} />
      <div className="px-16">
        <div className="flex gap-10">
          <aside className="min-w-sm space-y-5 sticky top-20 self-start">
            {costumePage?.title && (
              <div className="space-y-5">
                <h1 className="text-6xl font-cursive font-bold">{costumePage.title}</h1>
              </div>
            )}
            {costumePage?.description && (
              <div>
                <BlockRendererClient content={costumePage.description} />
              </div>
            )}
            {costumePage?.resume?.url && (
              <div className="pt-5">
                <Link to={`${STRAPI_URL}${costumePage.resume.url}`} className="flex flex-col items-center justify-center rounded-xl gap-1 aspect-square bg-amber-200 size-32">
                  <i className="text-7xl fa-solid fa-file-pdf pt-1"></i>
                  <span className="text-xs font-sans uppercase">Resume</span>
                </Link>
              </div>
            )}
          </aside>
          <div className="flex gap-10">
            <div className="flex-1 flex flex-col gap-10">
              {left.map((item) => {
                const idx = list.findIndex((i) => i.id === item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 * idx + 0.05 }}
                  >
                    <CostumingCard
                      date={item.publishedAt}
                      title={item.title}
                      slug={item.slug}
                      thumb={item.media?.[0]?.url}
                      alt={item.media?.[0]?.alternativeText || item.title}
                      descText={item.description}
                    />
                  </motion.div>
                );
              })}
            </div>
            <div className="flex-1 flex flex-col gap-10 pt-10">
              {right.map((item) => {
                const idx = list.findIndex((i) => i.id === item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 * idx + 0.05 }}
                  >
                    <CostumingCard
                      date={item.publishedAt}
                      title={item.title}
                      slug={item.slug}
                      thumb={item.media?.[0]?.url}
                      alt={item.media?.[0]?.alternativeText || item.title}
                      descText={item.description}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
