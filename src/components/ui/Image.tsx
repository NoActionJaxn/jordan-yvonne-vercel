import classNames from "classnames";
import { STRAPI_URL } from "../../constants/strapi";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Image({ src = '', alt = '', width, height, className }: ImageProps) {
  return (
    <div className={classNames(className, "overflow-hidden")}>
      <img
        src={`${STRAPI_URL}${src}`}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}