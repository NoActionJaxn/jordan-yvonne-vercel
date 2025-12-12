import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react'
import { Link } from 'react-router';
import { Heading, Paragraph } from '../ui/Typeography';

export interface BlockRendererProps {
  readonly content: PortableTextBlock[];
  className?: string;
  withStyles?: boolean;
}

const styledComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <Heading level={1} className='pb-5'>{children}</Heading>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    normal: ({ children }) => <Paragraph>{children}</Paragraph>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link
        to={value?.href ?? '#'}
        className="underline underline-offset-4 decoration-[3px] hover:opacity-80 transition-colors text-blue-600 dark:text-blue-400"
      >
        {children}
      </Link>
    ),
  },
};

export default function BlockRenderer({
  content,
  className,
  withStyles = false,
}: BlockRendererProps) {
  return (
    <div className={className}>
      <PortableText value={content} components={withStyles ? {} : styledComponents} />
    </div>
  );
}