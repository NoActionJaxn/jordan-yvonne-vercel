import { Outlet, useLoaderData, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";
import Head from "../components/shared/Head";
import PageHeader from "../components/shared/PageHeader";
import PageFooter from "../components/shared/PageFooter";
import '../styles/globals.css';
import type { DefaultLayoutData } from "../types/loaders";

export default function DefaultLayout() {
  const location = useLocation();
  const notRoot = location.pathname !== "/";

  const prevNotRootRef = useRef(notRoot);
  
  // eslint-disable-next-line
  const prevNotRoot = prevNotRootRef.current;

  useEffect(() => {
    prevNotRootRef.current = notRoot;
  }, [notRoot]);

  const {
    siteInfo,
    menu,
    socials,
  } = useLoaderData<DefaultLayoutData>();

  return (
    <>
      <Head siteTitle={siteInfo?.title} seo={siteInfo?.seo} favIcon={siteInfo?.favicon?.url} />
      <div className="min-h-screen h-full flex flex-col items-center justify-center py-8 bg-amber-50">
        <PageHeader logo={siteInfo?.logo?.url} menu={menu?.menu_items} condensed={notRoot} />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className={classNames("container sm:py-12 py-0")}
            initial={{ flexGrow: prevNotRoot ? 1 : 0 }}
            animate={{ flexGrow: notRoot ? 1 : 0 }}
            exit={{ flexGrow: notRoot ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <PageFooter socials={socials?.menu_items} condensed={notRoot} />
      </div>
    </>
  );
}
