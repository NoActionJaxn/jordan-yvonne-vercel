import classNames from "classnames";
import { useEffect, useState } from "react";
import { imageBuilder } from "../../lib/util/imageBuilder";
import Spinner from "./Spinner";
import type { SanityImageSource } from "@sanity/image-url";

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: SanityImageSource;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
  quality?: number;
}

function resolveImageUrl(src: SanityImageSource | undefined, width?: number, height?: number, quality?: number): string | null {
  if (!src) return null;
  try {
    let builder = imageBuilder(src);

    if (width) builder = builder.width(width);
    if (height) builder = builder.height(height);
    if (width && height) builder = builder.fit("max");
    if (width || height) {
      builder = builder.auto("format");
      builder = builder.quality(quality ?? 80);
    }

    return builder.url();
  } catch {
    return null;
  }
}

export default function Image({ src, alt = '', className, loading = "lazy", width, height, quality, ...rest }: ImageProps) {
  const url = resolveImageUrl(src, width, height, quality);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Reset state when the source URL changes
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [url]);

  if (!url || errored) return null;

  return (
    <div className={classNames(className, "relative flex items-center justify-center overflow-hidden")}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <img
        src={url}
        alt={alt}
        className={classNames("w-full h-auto object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        loading={loading}
        decoding="async"
        fetchPriority={loading === "eager" ? "high" : "low"}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        {...rest}
      />
    </div>
  );
}