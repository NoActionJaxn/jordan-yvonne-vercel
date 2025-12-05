import { Helmet } from "@dr.pogodin/react-helmet";
import { titleBuilder } from "../../lib/titleBuilder";
import type { StrapiSeo } from "../../types/strapi";
import { STRAPI_URL } from "../../constants/strapi";
import { isProd } from "../../lib/util/isProd";

export interface HeadProps {
  siteTitle?: string;
  pageTitle?: string;
  children?: React.ReactNode;
  seo?: StrapiSeo;
  favIcon?: string;
}

export default function Head({ siteTitle, pageTitle, children, favIcon, seo }: HeadProps) {
  return (
    <Helmet>
      <title>{titleBuilder({ siteTitle, pageTitle })}</title>

      {favIcon && (
        <>
          <link rel="icon" type="image/svg+xml" href={!isProd() ? `${STRAPI_URL}${favIcon}` : favIcon} />
          <link rel="shortcut icon" href={!isProd() ? `${STRAPI_URL}${favIcon}` : favIcon} />
          <link rel="apple-touch-icon" href={!isProd() ? `${STRAPI_URL}${favIcon}` : favIcon} />
        </>
      )}

      {seo?.canonicalURL && (
        <link rel="canonical" href={seo.canonicalURL} />
      )}
      {seo?.keywords && (
        <meta name="keywords" content={seo.keywords} />
      )}
      {seo?.metaDescription && (
        <meta name="description" content={seo.metaDescription} />
      )}
      {seo?.metaRobots && (
        <meta name="robots" content={seo.metaRobots} />
      )}
      {seo?.metaTitle && (
        <meta name="title" content={seo.metaTitle} />
      )}
      {seo?.metaViewport && (
        <meta name="viewport" content={seo.metaViewport} />
      )}
      {seo?.metaImage && (
        <meta name="image" content={!isProd() ? `${STRAPI_URL}${seo.metaImage.url}` : seo.metaImage.url} />
      )}

      {seo?.openGraph && (
        <>
          {seo.openGraph.ogTitle && (
            <meta property="og:title" content={seo.openGraph.ogTitle} />
          )}
          {seo.openGraph.ogDescription && (
            <meta property="og:description" content={seo.openGraph.ogDescription} />
          )}
          {seo.openGraph.ogType && (
            <meta property="og:type" content={seo.openGraph.ogType} />
          )}
          {seo.openGraph.ogURL && (
            <meta property="og:url" content={seo.openGraph.ogURL} />
          )}
          {seo.openGraph.ogImage && (
            <meta property="og:image" content={!isProd() ? `${STRAPI_URL}${seo.openGraph.ogImage.url}` : seo.openGraph.ogImage.url} />
          )}
        </>
      )}

      {seo?.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seo.structuredData)}
        </script>
      )}

      {children}
    </Helmet>
  )
}