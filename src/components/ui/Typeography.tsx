import classNames from "classnames";

export type HeadingLevels = 1 | 2 | 3 | 4;

export interface TypeographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevels;
}

export type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Paragraph({ children, className, ...rest }: ParagraphProps) {
  return (
    <p className={classNames("mb-4 leading-7", className)} {...rest}>
      {children}
    </p>
  );
}

export function Heading({ children, className, level = 1, ...rest }: TypeographyProps) {
  const common = "font-serif tracking-tight font-bold capitalize";

  switch (level) {
    case 1:
      return <h1 className={classNames(common, "text-4xl md:text-5xl font-normal! font-cursive!", className)} {...rest}>{children}</h1>;
    case 2:
      return <h2 className={classNames(common, "text-3xl md:text-4xl", className)} {...rest}>{children}</h2>;
    case 3:
      return <h3 className={classNames(common, "text-2xl md:text-3xl", className)} {...rest}>{children}</h3>;
    default:
      return <h4 className={classNames(common, "text-xl md:text-2xl", className)} {...rest}>{children}</h4>;
  }
}