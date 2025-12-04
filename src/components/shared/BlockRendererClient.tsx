import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import classNames from "classnames";
import { Link } from "react-router";


export interface BlockRendererClientProps {
  readonly content: BlocksContent;
  className?: string;
  styless?: boolean;
}

export default function BlockRendererClient({
  content,
  className,
  styless = false,
}: BlockRendererClientProps) {
  if (!content) return null;

  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={styless ? {} : ({
          heading: ({ children, level }) => {
            const common = "font-serif tracking-tight font-bold";

            switch (level) {
              case 1:
                return <h1 className={classNames(common, "text-4xl md:text-5xl")}>{children}</h1>;
              case 2:
                return <h2 className={classNames(common, "text-3xl md:text-4xl")}>{children}</h2>;
              case 3:
                return <h3 className={classNames(common, "text-2xl md:text-3xl")}>{children}</h3>;
              default:
                return <h4 className={classNames(common, "text-xl md:text-2xl")}>{children}</h4>;
            }
          },
          list: ({ children, format }) => {
            if (format === "ordered") {
              return (
                <ol className="list-decimal pl-6 space-y-2">
                  {children}
                </ol>
              );
            }
            return (
              <ul className="list-disc pl-6 space-y-2">
                {children}
              </ul>
            );
          },
          link: ({ children, url }) => {
            return (
              <Link
                to={url}
                className="underline underline-offset-4 decoration-[3px] hover:opacity-80 transition-colors text-blue-600 dark:text-blue-400"
              >
                {children}
              </Link>
            );
          },
        })}
      />
    </div>
  );
}