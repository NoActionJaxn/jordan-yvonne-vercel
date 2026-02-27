import { Outlet, useLoaderData, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";
import PageHeader from "../../src/components/shared/PageHeader";
import PageFooter from "../../src/components/shared/PageFooter";
import {
  fetchDefaultSEO,
  fetchMenuItems,
  fetchSiteSettings,
  fetchSocialLinks,
} from "../../src/lib/requests";
import { titleBuilder } from "../../src/lib/titleBuilder";
import { imageBuilder } from "../../src/lib/util/imageBuilder";
import type { SanityCallToAction, SanitySEO } from "../../src/types/sanity";
import type { SiteSettings } from "../../src/types/requests";

interface LoaderData {
  menu?: {
    menuItems: SanityCallToAction[];
  };
  socials?: {
    socialLinks: SanityCallToAction[];
  };
  seo: SanitySEO;
  settings: SiteSettings;
}

export async function loader() {
  const [menu, socials, seo, settings] = await Promise.all([
    fetchMenuItems(),
    fetchSocialLinks(),
    fetchDefaultSEO(),
    fetchSiteSettings(),
  ]);

  return { menu, socials, seo, settings };
}

export function meta({ data }: { data: LoaderData }) {
  const seo = data?.seo;
  const settings = data?.settings;
  const title = titleBuilder({ siteTitle: settings?.title });

  const tags: Array<Record<string, string>> = [{ title }];

  if (seo?.metaCharset) tags.push({ name: "charset", content: seo.metaCharset });
  if (seo?.metaDescription) tags.push({ name: "description", content: seo.metaDescription });
  if (seo?.metaKeywords?.length) tags.push({ name: "keywords", content: seo.metaKeywords.join(", ") });
  if (seo?.metaAuthor) tags.push({ name: "author", content: seo.metaAuthor });
  if (seo?.metaRobots) tags.push({ name: "robots", content: seo.metaRobots });

  if (settings?.favicon) {
    try {
      const faviconUrl = imageBuilder(settings.favicon).url();
      tags.push({ tagName: "link", rel: "icon", type: "image/svg+xml", href: faviconUrl });
    } catch { /* ignore */ }
  }

  return tags;
}

export function links({ data }: { data: LoaderData }) {
  const linkTags: Array<Record<string, string>> = [];
  const seo = data?.seo;

  if (seo?.canonicalURL) {
    linkTags.push({ rel: "canonical", href: seo.canonicalURL });
  }

  return linkTags;
}

export default function LayoutRoute() {
  const location = useLocation();
  const notRoot = location.pathname !== "/";

  const prevNotRootRef = useRef(notRoot);

  // eslint-disable-next-line
  const prevNotRoot = prevNotRootRef.current;

  useEffect(() => {
    prevNotRootRef.current = notRoot;
  }, [notRoot]);

  const { menu, socials, settings } = useLoaderData<LoaderData>();

  return (
    <>
      {/* Decorative corner borders — fixed, outside the flow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-5 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 -z-10 bg-[url('/artistic-border.svg')] bg-contain bg-no-repeat bg-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 -z-10 bg-[url('/artistic-border.svg')] bg-contain bg-no-repeat bg-center rotate-180"
      />
      <div className="min-h-screen h-full flex flex-col items-center justify-center py-8 relative">
        <PageHeader logo={settings?.logo} menu={menu?.menuItems} condensed={notRoot} />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className={classNames("container sm:py-12 py-0 px-2")}
            initial={{ flexGrow: prevNotRoot ? 1 : 0 }}
            animate={{ flexGrow: notRoot ? 1 : 0 }}
            exit={{ flexGrow: notRoot ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <PageFooter socials={socials?.socialLinks} condensed={notRoot} />
      </div>
    </>
  );
}
