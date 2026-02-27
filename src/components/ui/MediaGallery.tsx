import classNames from "classnames";
import Image from "./Image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useOutsideClick from "../../hooks/useOutsideClick";
import type { SanityImageSource } from "@sanity/image-url";

export interface MediaGalleryProps {
  items: SanityImageSource[];
  className?: string;
  columns?: {
    base?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const colClass = (n?: number) => {
  switch (n) {
    case 1: return "grid-cols-1";
    case 2: return "grid-cols-2";
    case 3: return "grid-cols-3";
    case 4: return "grid-cols-4";
    case 5: return "grid-cols-5";
    case 6: return "grid-cols-6";
    default: return "grid-cols-1";
  }
};

export default function MediaGallery({ items, className, columns }: MediaGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = typeof activeIndex === "number" ? items[activeIndex] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  
  const baseCols = colClass(columns?.base ?? 1);
  const xsCols = columns?.xs ? `xs:${colClass(columns.xs)}` : "xs:grid-cols-2";
  const smCols = columns?.sm ? `sm:${colClass(columns.sm)}` : "sm:grid-cols-2";
  const mdCols = columns?.md ? `md:${colClass(columns.md)}` : "md:grid-cols-3";
  const lgCols = columns?.lg ? `lg:${colClass(columns.lg)}` : "lg:grid-cols-4";
  const xlCols = columns?.xl ? `xl:${colClass(columns.xl)}` : "xl:grid-cols-5";

  // Lightbox content ref to enable outside-click dismissal
  const contentRef = useRef<HTMLDivElement>(null);
  useOutsideClick(contentRef, () => setActiveIndex(null), Boolean(activeItem));

  return (
    <div
      className={classNames(
        "grid gap-10 px-10 py-15",
        baseCols,
        smCols,
        mdCols,
        lgCols,
        xlCols,
        className
      )}
    >
      {items.map((item, idx) => (
        <figure
          key={idx}
          className="relative overflow-hidden rounded-2xl aspect-square bg-black cursor-pointer [&_img]:w-full [&_img]:h-full [&_img]:object-cover"
          onClick={() => setActiveIndex(idx)}
        >
          <Image
            src={item}
            alt="Image"
            className="w-full h-full"
            loading="lazy"
          />
        </figure>
      ))}

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              ref={contentRef}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeItem}
                alt=""
                className="w-full h-auto object-contain rounded-md"
              />
              <button
                onClick={() => setActiveIndex(null)}
                className="pointer-cursor absolute -top-7 -right-7 bg-amber-900 text-amber-100 hover:bg-amber-700 transition-colors rounded-full size-15 flex items-center justify-center"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark"></i>
                <span className="sr-only">Close</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
