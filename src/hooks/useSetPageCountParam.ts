import { useSearchParams } from "react-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";

export interface UseScrollingPageSizeProps {
  max: number;
  limit: number;
}

export default function useSetPageCountParam({ max, limit }: UseScrollingPageSizeProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Keep a stable ref so effects don't re-trigger when the reference changes
  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;

  const page = Number(searchParams.get("page") ?? 1);

  const handleScroll = useCallback(() => {
    const scrollPos = window.innerHeight + window.scrollY;
    const bottom = document.documentElement.scrollHeight - 50;

    if (scrollPos >= bottom) {
      const hasMore = (limit * page) < max;

      if (hasMore) {
        const next = page + 1;
        setSearchParamsRef.current((prev) => {
          const updated = new URLSearchParams(prev);
          updated.set("page", String(next));
          return updated;
        }, { replace: true });
      }
    }
  }, [page, max, limit]);

  const debouncedHandleScroll = useMemo(() => debounce(handleScroll, 200), [handleScroll]);

  const prevLimitRef = useRef(limit);

  useEffect(() => {
    // Only reset page when limit actually changes (not on every render)
    if (prevLimitRef.current !== limit) {
      prevLimitRef.current = limit;
      setSearchParamsRef.current((prev) => {
        const updated = new URLSearchParams(prev);
        updated.set("page", "1");
        updated.set("limit", String(limit));
        return updated;
      }, { replace: true });
    }
  }, [limit]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      debouncedHandleScroll.cancel?.();
    };
  }, [debouncedHandleScroll]);
}