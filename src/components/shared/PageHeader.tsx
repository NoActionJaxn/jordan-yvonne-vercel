import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router";
import classNames from "classnames";
import Image from "../ui/Image";
import type { StrapiCallToAction } from "../../types/strapi";
import MenuButton from "./MenuButton";
import { Heading } from "../ui/Typeography";

export interface PageHeaderProps {
  logo?: string;
  menu?: StrapiCallToAction[];
  condensed?: boolean;
}

export default function PageHeader({ logo, menu, condensed }: PageHeaderProps) {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  }

  const handleCloseMenu = () => {
    setIsOpen(false);
  }

  const isActive = (url?: string) => {
    if (!url) return false;
    return location.pathname.includes(url);
  }

  return (
    <header className="flex flex-col items-center container">
      <MenuButton onClick={handleToggleMenu} isOpen={isOpen} />
      <div>
        <Link to={{ pathname: "/" }}>
          <Image
            src={logo}
            className={classNames(
              condensed ? "w-3xs" : "w-xs",
              "transition-all duration-300 ease-in-out"
            )}
            alt="Logo"
          />
        </Link>
      </div>
      <div className="hidden sm:block">
        <nav className="p-4 flex items-center">
          <ul className="space-x-4 space-y-4 sm:flex inline">
            {menu?.map((item, i) => (
              <>
                <li key={item.id}>
                  <Link to={{
                    pathname: item.url
                  }}
                    className={
                      classNames(
                        "font-cursive transition-all duration-300 ease-in-out",
                        "hover:underline decoration-transparent hover:decoration-amber-400!",
                        isActive(item.url) ? "underline decoration-black!" : undefined,
                        condensed ? "underline-offset-5" : "underline-offset-7",
                        condensed ? "text-5xl" : "text-7xl",
                      )}>
                    {item.label}
                  </Link>
                </li>
                {i < menu.length - 1 && (
                  <span className={
                    classNames(
                      "transition-all duration-300 ease-in-out",
                      "sm:inline-block hidden",
                      condensed ? "text-4xl" : "text-6xl"
                    )}>•</span>
                )}
              </>
            ))}
          </ul>
        </nav>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="sm:hidden fixed z-10 top-0 left-0 w-full h-full bg-amber-50 flex flex-col items-center justify-center"
          >
            <nav className="p-4 space-y-5">
              <Heading level={2} className="font-cursive!">Menu</Heading>
              <div className="flex flex-col items-center">
                <ul className="space-y-4">
                  {menu?.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={{ pathname: item.url }}
                        onClick={handleCloseMenu}
                        className={
                          classNames(
                            "font-cursive text-5xl underline decoration-transparent hover:decoration-amber-400! underline-offset-5 transition-all duration-300 ease-in-out",
                            isActive(item.url) ? "underline decoration-black!" : undefined
                          )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}