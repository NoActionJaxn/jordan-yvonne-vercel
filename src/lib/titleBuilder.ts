interface TitleBuilderProps {
  pageTitle?: string;
  siteTitle?: string;
}

const DEFAULT_TITLE = 'Jordan-Yvonne';

export const titleBuilder = ({ pageTitle, siteTitle }: TitleBuilderProps) => {
  if (pageTitle && siteTitle) {
    return `${pageTitle} | ${siteTitle}`;
  } else if (siteTitle) {
    return siteTitle;
  } else if (pageTitle) {
    return pageTitle;
  } else {
    return DEFAULT_TITLE;
  }
}
