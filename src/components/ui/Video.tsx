import classNames from "classnames";
import { STRAPI_URL } from "../../constants/strapi";

interface VideoProps extends React.HTMLAttributes<HTMLVideoElement> {
  src?: string;
  className?: string;
  poster?: string;
  controls?: boolean;
  preload?: "auto" | "metadata" | "none";
}

export default function Video({ src = '', poster = '', className, controls = true, preload = "metadata", ...rest }: VideoProps) {
  return (
    <div className={classNames(className, "flex items-center justify-center overflow-hidden")}>
      <video
        src={src}
        poster={poster && `${STRAPI_URL}${poster}`}
        className="w-full h-auto object-cover"
        controls={controls}
        preload={preload}
        {...rest}
      />
    </div>
  );
}