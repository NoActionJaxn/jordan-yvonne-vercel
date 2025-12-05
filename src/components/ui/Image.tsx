import classNames from "classnames";
import { STRAPI_URL } from "../../constants/strapi";
import { isProd } from "../../lib/util/isProd";

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string;
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
        src={!isProd() ? `${STRAPI_URL}${src}` : src}
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