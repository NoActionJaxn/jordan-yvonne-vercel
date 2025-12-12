import { Helmet } from "@dr.pogodin/react-helmet";
import { titleBuilder } from "../../lib/titleBuilder";
import type { SEO } from "../../types/seo";
import type { SanityImageSource } from "@sanity/image-url";
import { imageBuilder } from "../../lib/util/imageBuilder";

export interface HeadProps {
  siteTitle?: string;
  pageTitle?: string;
  children?: React.ReactNode;
  seo?: SEO;
  favIcon?: SanityImageSource;
}

export default function Head({ siteTitle, pageTitle, children, favIcon, seo }: HeadProps) {
  return (
    <Helmet>
      <title>{titleBuilder({ siteTitle, pageTitle })}</title>

      {favIcon && (
        <>
          <link rel="icon" type="image/svg+xml" href={imageBuilder(favIcon).url()} />
          <link rel="shortcut icon" href={imageBuilder(favIcon).url()} />
          <link rel="apple-touch-icon" href={imageBuilder(favIcon).url()} />
        </>
      )}

      <meta name="charset" content={seo?.metaCharset ? seo.metaCharset : "UTF-8"} />
      <meta name="language" content={seo?.metaLanguage ? seo.metaLanguage : "en-US"} />
      <meta name="viewport" content={seo?.metaViewport ? seo.metaViewport : "width=device-width, initial-scale=1"} />

      {seo?.metaAuthor && (
        <link rel="metaAuthor" href={seo.metaAuthor} />
      )}
      {seo?.canonicalURL && (
        <link rel="canonical" href={seo.canonicalURL} />
      )}
      {seo?.metaKeywords && seo?.metaKeywords.length > 0 && (
        <meta name="keywords" content={seo.metaKeywords.join(", ")} />
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
      {seo?.metaImage && (
        <meta name="image" content={imageBuilder(seo.metaImage).url()} />
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
          {seo.openGraph.ogUrl && (
            <meta property="og:url" content={seo.openGraph.ogUrl} />
          )}
          {seo.openGraph.ogImage && (
            <meta property="og:image" content={imageBuilder(seo.openGraph.ogImage).url()} />
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