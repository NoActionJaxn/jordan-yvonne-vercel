import classNames from "classnames";
import Image from "../ui/Image";
import { STRAPI_URL } from "../../constants/strapi";
import Video from "./Video";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface MediaItem {
  url: string;
  mime: string;
  alt?: string;
  poster?: string;
  width?: number;
  height?: number;
}

export interface MediaGalleryProps {
  items: MediaItem[];
  className?: string;
  columns?: {
    base?: number;
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
  const smCols = columns?.sm ? `sm:${colClass(columns.sm)}` : "";
  const mdCols = columns?.md ? `md:${colClass(columns.md)}` : "md:grid-cols-2"; // sensible default
  const lgCols = columns?.lg ? `lg:${colClass(columns.lg)}` : "lg:grid-cols-3";
  const xlCols = columns?.xl ? `xl:${colClass(columns.xl)}` : "xl:grid-cols-4";

  return (
    <div
      className={classNames(
        "grid gap-4",
        baseCols,
        smCols,
        mdCols,
        lgCols,
        xlCols,
        className
      )}
    >
      {items.map((item, idx) => {
        const isImage = item.mime.startsWith("image/");
        const isVideo = item.mime.startsWith("video/");

        return (
          <figure
            key={`${item.url}-${idx}`}
            className="relative flex items-center justify-center overflow-hidden rounded-2xl aspect-square bg-black cursor-pointer"
            onClick={() => setActiveIndex(idx)}
          >
            {isImage && (
              <Image
                src={item.url}
                alt={item.alt ?? ""}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
            {isVideo && (
              item.poster ? (
                <Image
                  src={item.poster}
                  alt={item.alt ?? ""}
                  className="w-full h-full object-cover"
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                />
              ) : (
                <div className="relative">
                  <Video
                    src={`${STRAPI_URL}${item.url}`}
                    preload="none"
                    className="w-full h-full object-cover"
                    controls={false}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/40 text-white rounded-full size-15 flex items-center justify-center">
                      <i className="fa-solid fa-play text-2xl"></i>
                      <span className="sr-only">Play Video</span>
                    </span>
                  </div>
                </div>
              )
            )}
          </figure>
        );
      })}

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
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {activeItem.mime.startsWith("image/") && (
                <Image
                  src={activeItem.url}
                  alt={activeItem.alt ?? ""}
                  className="w-full h-auto object-contain rounded-md"
                />
              )}
              {activeItem.mime.startsWith("video/") && (
                <Video
                  src={`${STRAPI_URL}${activeItem.url}`}
                  poster={activeItem.poster}
                  controls
                  preload="metadata"
                  className="w-full h-auto rounded-md"
                />
              )}
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
