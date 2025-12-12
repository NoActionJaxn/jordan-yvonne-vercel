import classNames from "classnames";
import { sanityImageBuilder } from "../../lib/util/sanityImageBuilder";
import type { SanityImageSource } from "@sanity/image-url";

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: SanityImageSource;
  alt?: string;
  className?: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
}

export default function Image({ src = '', alt = '', className, loading = "lazy", width, height, ...rest }: ImageProps) {
  return (
    <div className={classNames(className, "flex items-center justify-center overflow-hidden")}>
      <img
        src={sanityImageBuilder(src).url()}
        alt={alt}
        className="w-full h-auto object-cover"
        loading={loading}
        width={width}
        height={height}
        {...rest}
      />
    </div>
  );
}