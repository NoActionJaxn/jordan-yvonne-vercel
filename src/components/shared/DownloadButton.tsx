import classNames from "classnames";
import { STRAPI_URL } from "../../constants/strapi";
import { LinkButton, type LinkButtonProps } from "../ui/Buttons";

export interface DownloadButtonProps extends Omit<LinkButtonProps, "to" | "download"> {
  fileUrl?: string;
  label?: string;
  faIconClassName?: string;
}

export default function DownloadButton({
  fileUrl,
  label = "Download",
  faIconClassName = "fa-solid fa-file-pdf",
  className,
  ...rest
}: DownloadButtonProps) {
  return (
    <LinkButton
      aria-disabled={!fileUrl}
      to={`${STRAPI_URL}${fileUrl}`}
      className={
        classNames(
          "flex flex-col items-center justify-center rounded-xl gap-1 aspect-square size-32",
          className
        )}
      download
      {...rest}>
      <i className={classNames("text-7xl pt-1", faIconClassName)}></i>
      <span className="text-xs font-sans uppercase">{label}</span>
    </LinkButton>
  );
};
