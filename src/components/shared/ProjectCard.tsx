import { Link } from "react-router";
import Image from "../ui/Image";
import { formatDate } from "../../lib/util/formatDate";
import { portableTextToText } from "../../lib/util/portableTextToText";
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

export interface ProjectCardProps {
  basePath: string;
  date?: string;
  title: string;
  slug: string;
  thumb?: SanityImageSource;
  alt?: string;
  descText?: PortableTextBlock[];
}

export default function ProjectCard({
  basePath,
  date,
  title,
  slug,
  thumb,
  alt,
  descText,
}: ProjectCardProps) {
  return (
    <Link
      to={{ pathname: `${basePath}/${slug}` }}
      className="group block rounded-2xl transition-shadow"
    >
      {date && (
        <div>
          <span className="block text-sm p-2">{formatDate(date)}</span>
        </div>
      )}
      <div className="block bg-white rounded-2xl shadow-md ring-0 group-hover:ring-4 ring-amber-400 group-focus-visible:ring-2 group-active:ring-2">
        <div className="flex flex-col">
          {thumb ? (
            <Image
              src={thumb}
              alt={alt || title}
              className="w-full rounded-t-2xl"
            />
          ) : (
            <div className="w-full aspect-3/4 bg-gray-200 rounded-t-2xl flex items-center justify-center">
              <i className="text-6xl fa-solid fa-image text-gray-400"></i>
            </div>
          )}
          <div className="px-4 pt-3 pb-4">
            <h3 className="text-xl font-serif font-bold capitalize">{title}</h3>
            {descText && (
              <div className="line-clamp-3 h-16">
                <p className="text-sm">{portableTextToText(descText)}</p>
              </div>
            )}
          </div>
          <div className="text-xs px-4 pb-4 pt-0.5 flex items-center justify-end gap-2">
            <span>Read More</span>
            <i className="fa-solid fa-chevron-right mt-0.5"></i>
          </div>
        </div>
      </div>
    </Link>
  );
}
