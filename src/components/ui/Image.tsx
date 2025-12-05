import classNames from "classnames";
import { STRAPI_URL } from "../../constants/strapi";

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
        src={`${STRAPI_URL}${src}`}
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