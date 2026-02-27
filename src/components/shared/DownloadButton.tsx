import classNames from "classnames";
import { type SanityFileSource, documentBuilder } from "../../lib/util/documentBuilder";

export interface DownloadButtonProps {
  fileUrl?: SanityFileSource;
  label?: string;
  faIconClassName?: string;
  className?: string;
}

export default function DownloadButton({
  fileUrl,
  label = "Download",
  faIconClassName = "fa-solid fa-file-pdf",
  className,
}: DownloadButtonProps) {
  const url = fileUrl ? documentBuilder(fileUrl).url() : "";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={!fileUrl}
      className={
        classNames(
          "inline-flex items-center justify-center rounded-lg font-bold uppercase focus:outline-none focus:ring-4 transition-colors cursor-pointer",
          "border-2 border-black text-black bg-amber-300 hover:bg-amber-400 focus:ring-amber-400",
          "flex flex-col items-center justify-center rounded-xl gap-1 aspect-square size-32",
          !fileUrl && "opacity-50 pointer-events-none",
          className
        )}>
      <i className={classNames("text-7xl pt-1", faIconClassName)}></i>
      <span className="text-xs font-sans uppercase">{label}</span>
    </a>
  );
};
