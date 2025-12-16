import { Helmet } from "@dr.pogodin/react-helmet";
import { titleBuilder } from "../../lib/titleBuilder";
import type { SanityImageSource } from "@sanity/image-url";
import { imageBuilder } from "../../lib/util/imageBuilder";
import type { SanitySEO } from "../../types/sanity";

export interface HeadProps {
  siteTitle?: string;
  pageTitle?: string;
  children?: React.ReactNode;
  seo?: SanitySEO;
  favIcon?: SanityImageSource;
}

export default function Head({ siteTitle, pageTitle, children, favIcon, seo }: HeadProps) {

  return (
    <Helmet>
      <title>{titleBuilder({ siteTitle, pageTitle })}</title>

      {favIcon && <link rel="icon" type="image/svg+xml" href={imageBuilder(favIcon).url()} />}
      {favIcon && <link rel="shortcut icon" href={imageBuilder(favIcon).url()} />}
      {favIcon && <link rel="apple-touch-icon" href={imageBuilder(favIcon).url()} />}

      <meta name="charset" content={seo?.metaCharset ? seo.metaCharset : "UTF-8"} />
      <meta name="language" content={seo?.metaLanguage ? seo.metaLanguage : "en-US"} />
      <meta name="viewport" content={seo?.metaViewport ? seo.metaViewport : "width=device-width, initial-scale=1"} />

      {/* SEO */}
      {seo?.canonicalURL && <link rel="canonical" href={seo.canonicalURL} />}
      {seo?.metaAuthor && <link rel="author" href={seo.metaAuthor} />}
      {seo?.metaKeywords && seo?.metaKeywords.length > 0 && (
        <meta name="keywords" content={seo.metaKeywords.join(", ")} />
      )}
      {seo?.metaDescription && <meta name="description" content={seo.metaDescription} />}
      {seo?.metaRobots && <meta name="robots" content={seo.metaRobots} />}
      {seo?.metaTitle && <meta property="title" content={seo.metaTitle} />}
      {seo?.metaImage && <meta name="image" content={imageBuilder(seo.metaImage).url()} />}
      {seo?.type && <meta property="og:type" content={seo.type} />}

      {seo?.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seo.structuredData)}
        </script>
      )}

      {/* Open Graph */}
      {seo?.canonicalURL && <meta property="og:see_also" content={seo.canonicalURL} />}
      {seo?.metaTitle && <meta property="og:site_name" content={seo.metaTitle} />}
      {pageTitle && <meta property="og:title" content={pageTitle} />}
      {seo?.metaDescription && <meta property="og:description" content={seo.metaDescription} />}
      {seo?.metaImage && <meta property="og:image" content={imageBuilder(seo.metaImage).url()} />}
      {seo?.canonicalURL && <meta name="twitter:url" content={seo.canonicalURL} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {seo?.metaDescription && <meta name="twitter:description" content={seo.metaDescription} />}
      {seo?.metaTitle && <meta name="twitter:title" content={seo.metaTitle} />}
      {seo?.metaImage && <meta name="twitter:image" content={imageBuilder(seo.metaImage).url()} />}
      {seo?.canonicalURL && <meta name="twitter:url" content={seo.canonicalURL} />}

      <>{children}</>
    </Helmet>
  )
}