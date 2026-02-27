import { Outlet, useLoaderData, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";
import PageHeader from "../../src/components/shared/PageHeader";
import PageFooter from "../../src/components/shared/PageFooter";
import { buildMetaTags } from "../lib/seo";
import {
  fetchDefaultSEO,
  fetchMenuItems,
  fetchSiteSettings,
  fetchSocialLinks,
} from "../../src/lib/requests";
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
  return buildMetaTags({
    siteTitle: data?.settings?.title,
    seoSources: [data?.seo],
    favicon: data?.settings?.favicon,
  });
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
