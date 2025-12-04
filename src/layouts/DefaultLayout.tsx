import { Link, Outlet, useLoaderData, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import classNames from "classnames";
import Head from "../components/shared/Head";
import Image from "../components/ui/Image";
import '../styles/globals.css';
import type { DefaultLayoutData } from "../lib/loaders";

export default function DefaultLayout() {
  const location = useLocation();
  const notRoot = location.pathname !== "/";

  const prevNotRootRef = useRef(notRoot);
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
      <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-amber-50">
        <header className="flex flex-col items-center container">
          <div>
            <Link to={{ pathname: "/" }}>
              <Image
                src={siteInfo?.logo?.url}
                className={classNames(
                  notRoot ? "w-3xs" : "w-xs",
                  "transition-all duration-300 ease-in-out"
                )}
                alt="Logo"
              />
            </Link>
          </div>
          <div>
            <nav className="p-4 flex items-center">
              <ul className="space-x-4">
                {menu?.menu_items.map((item, i) => (
                  <>
                    <li key={item.id} className="inline">
                      <Link to={{
                        pathname: item.url
                      }}
                        className={
                          classNames(
                            "font-cursive transition-all duration-300 ease-in-out",
                            notRoot ? "text-5xl" : "text-7xl"
                          )}>
                        {item.label}
                      </Link>
                    </li>
                    {i < menu.menu_items.length - 1 && (
                      <span className={
                        classNames(
                          "transition-all duration-300 ease-in-out",
                          notRoot ? "text-4xl" : "text-6xl"
                        )}>•</span>
                    )}
                  </>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            className={classNames("container py-12")}
            initial={{ flexGrow: prevNotRoot ? 1 : 0 }}
            animate={{ flexGrow: notRoot ? 1 : 0 }}
            exit={{ flexGrow: notRoot ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <footer className="container">
          <nav className={classNames("px-4 w-min transition-all ease-in-out duration-300", notRoot ? "ml-auto" : "mx-auto")}>
            <div className="flex items-center gap-4 w-max">
              <h2 className={classNames("font-semibold transition-all ease-in-out duration-300", notRoot ? "text-sm" : "text-lg")}>Follow Me</h2>
              <ul className={classNames("text-center transition-all ease-in-out duration-300", notRoot ? "space-x-4" : "space-x-5")}>
                {socials?.menu_items.map((item) => (
                  <li key={item.id} className="inline">
                    <a href={item.url} referrerPolicy="no-referrer" target="_blank" className={classNames(notRoot ? "text-2xl" : "text-4xl")}>
                      <i className={classNames(item.icon?.name, item.icon?.pack)} />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </footer>
      </div>
    </>
  )
}
