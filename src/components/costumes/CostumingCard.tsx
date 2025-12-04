import { Link } from "react-router";
import Image from "../ui/Image";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from "../shared/BlockRendererClient";
import { formatDate } from "../../lib/util/formatDate";

interface CostumingCardProps {
  date?: string;
  title: string;
  slug: string;
  thumb?: string;
  alt?: string;
  descText?: BlocksContent;
}

export default function CostumingCard({
  date,
  title,
  slug,
  thumb,
  alt,
  descText,
}: CostumingCardProps) {
  return (
    <Link to={{ pathname: `/costuming/${slug}` }}>
      {date && (
        <div>
          <span className="block text-sm p-2">{formatDate(date)}</span>
        </div>
      )}
      <div className="block bg-white rounded-2xl shadow-md">
        <div className="flex flex-col">
          {thumb && (
            <Image
              src={thumb}
              alt={alt || title}
              className="w-full h-auto bg-black rounded-t-2xl"
            />
          )}
          <div className="px-4 pt-3 pb-4">
            <h3 className="text-xl font-serif font-bold capitalize">{title}</h3>
            {descText && (
              <div className="line-clamp-3">
                <BlockRendererClient className="text-sm" content={descText} styless />
              </div>
            )}
          </div>
          <div className="text-right px-6 pb-4">
            Read More
          </div>
        </div>
      </div>
    </Link>
  );
}