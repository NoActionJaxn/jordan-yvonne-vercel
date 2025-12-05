import { useEffect } from "react";

export type OutsideClickHandler = (event: MouseEvent | TouchEvent) => void;

/**
 * useOutsideClick
 * Calls `handler` when a click/touchstart happens outside the provided element ref.
 *
 * Example:
 * const ref = useRef<HTMLDivElement>(null);
 * useOutsideClick(ref, () => setOpen(false));
 */
export default function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: OutsideClickHandler,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el) return;
      // If click is inside the element, ignore
      if (event.target instanceof Node && el.contains(event.target)) return;
      handler(event);
    };

    document.addEventListener("mousedown", listener, { capture: true });
    document.addEventListener("touchstart", listener, { capture: true });

    return () => {
      document.removeEventListener("mousedown", listener, { capture: true });
      document.removeEventListener("touchstart", listener, { capture: true });
    };
  }, [ref, handler, enabled]);
}
