import { useSearchParams } from "react-router";
import { useCallback, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

export interface UseScrollingPageSizeProps {
  max: number;
  limit: number;
}

export default function useSetPageCountParam({ max, limit }: UseScrollingPageSizeProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageCount = Number(searchParams.get("pageCount") ?? 1);
  const maxPerPage = Number(searchParams.get("limit") ?? 5);

  const handleScroll = useCallback(() => {
    const scrollPos = window.innerHeight + window.scrollY;
    const bottom = document.documentElement.scrollHeight - 50;

    if (scrollPos >= bottom) {
      const hasMore = (maxPerPage * pageCount) < max;

      if (hasMore) {
        const next = pageCount + 1;
        setSearchParams({ pageCount: String(next) }, { replace: true });
      }
    }
  }, [pageCount, max, setSearchParams, maxPerPage]);

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 200), [handleScroll]);

  useEffect(() => {
    // Reset pageCount when limit changes
    setSearchParams({ pageCount: "1", limit: String(limit) }, { replace: true });
  }, [limit, setSearchParams]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      debouncedHandleScroll.cancel?.();
    };
  }, [debouncedHandleScroll]);
}