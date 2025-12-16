import classNames from "classnames"
import type { SanityCallToAction } from "../../types/sanity";

export interface PageFooterProps {
  socials?: SanityCallToAction[];
  condensed?: boolean;
}

export default function PageFooter({ socials, condensed }: PageFooterProps) {
  return (
    <footer className="container">
      <div
        className={classNames(
          "flex transition-all duration-300 ease-in-out",
          condensed ? "justify-end" : "justify-center"
        )}
      >
        {socials && socials.length > 0 && (
          <nav className="px-4 w-min">
            <div className="flex items-center gap-4 w-max">
              <h2
                className={classNames(
                  "font-semibold transition-all duration-300 ease-in-out",
                  condensed ? "text-sm" : "text-lg"
                )}
              >
                Follow Me
              </h2>

              <ul
                className={classNames(
                  "text-center transition-all duration-300 ease-in-out",
                  condensed ? "space-x-4" : "space-x-5"
                )}
              >
                {socials.map((item) => (
                  <li key={item._key} className="inline">
                    <a
                      href={item.url}
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className={classNames(condensed ? "text-2xl" : "text-4xl")}
                    >
                      <i className={classNames(item.icon?.iconName, item.icon?.iconStyle)} />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>
    </footer>

  )
}