import fetchApi from "./strapi";
import type { SiteInfo } from "../types/siteInfo";

export const fetchSiteInfo = await fetchApi<SiteInfo>({
  endpoint: "site-info",
  wrappedByKey: "data",
  query: {
    populate: [
      "seo",
      "seo.openGraph",
      "seo.metaImage",
      "seo.openGraph.ogImage",
      "favicon",
      "logo",
      "logo_alt"
    ],
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching site info:", err);
  return null;
});
