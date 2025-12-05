import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { Link } from "react-router";
import { Heading, Paragraph } from "../common/Typeography";


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

            switch (level) {
              case 1:
                return <Heading level={1}>{children}</Heading>;
              case 2:
                return <Heading level={2}>{children}</Heading>;
              case 3:
                return <Heading level={3}>{children}</Heading>;
              default:
                return <Heading level={4}>{children}</Heading>;
            }
          },
          paragraph: ({ children }) => {
            return <Paragraph>{children}</Paragraph>;
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