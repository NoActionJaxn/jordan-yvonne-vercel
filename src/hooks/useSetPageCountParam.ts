import { useSearchParams } from "react-router";
import type { StrapiMeta } from "../types/strapi";
import { useCallback, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

export interface UseScrollingPageSizeProps {
  meta?: StrapiMeta;
}

export default function useSetPageCountParam({ meta }: UseScrollingPageSizeProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Number(searchParams.get("pageCount") ?? meta?.pagination.page ?? 1);
  const totalResults = meta?.pagination.total ?? 0;
  const resultsPerPage = meta?.pagination.pageSize ?? 10;

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

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 200), [handleScroll]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      debouncedHandleScroll.cancel?.();
    };
  }, [debouncedHandleScroll]);
}