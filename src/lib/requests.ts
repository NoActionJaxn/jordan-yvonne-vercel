import fetchApi from "./strapi";
import type {
  SiteInfo,
  Socials,
  Menu,
  LandingPage,
  ActorPage,
  IllustratorPage,
  CostumePage,
  CostumeList,
  IllustrationList,
  ActorList
} from "../types/requests";


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

export const fetchMenu = await fetchApi<{ menu: Menu }>({
  endpoint: "site-info",
  wrappedByKey: "data",
  query: {
    populate: "menu.menu_items",
  },
}).then((res) => {
  return res.menu;
}).catch((err) => {
  console.error("Error fetching menu:", err);
  return null;
});

export const fetchSocials = await fetchApi<{ socials: Socials }>({
  endpoint: "site-info",
  wrappedByKey: "data",
  query: {
    populate: "socials.menu_items.icon",
  },
}).then((res) => {
  return res.socials;
}).catch((err) => {
  console.error("Error fetching menu:", err);
  return null;
});

export const fetchLandingPage = await fetchApi<LandingPage>({
  endpoint: "landing-page",
  wrappedByKey: "data",
  query: {
    populate: "*",
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching landing page:", err);
  return null;
});

export const fetchCostumePage = await fetchApi<CostumePage>({
  endpoint: "costume-page",
  wrappedByKey: "data",
  query: {
    populate: "*",
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching costume page:", err);
  return null;
});

export const fetchCostumeList = async (pageNumber: number = 1) => await fetchApi<CostumeList>({
  endpoint: "costuming",
  query: {
    sort: "publishedAt:desc",
    populate: "*",
    "pagination[pageSize]": String(4 * pageNumber),
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching costume page list:", err);
  return null;
});

export const fetchCostumeItem = async (slug: string) => await fetchApi<CostumeList>({
  endpoint: "costuming",
  query: {
    filters: { slug: { $eq: slug } },
    populate: "*",
  },
}).then((res) => {
  return res.data[0] ?? null;
}).catch((err) => {
  console.error("Error fetching costumer:", err);
  return null;
});

export const fetchActorPage = await fetchApi<ActorPage>({
  endpoint: "actor-page",
  wrappedByKey: "data",
  query: {
    populate: "*",
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching costume page:", err);
  return null;
});

export const fetchActorList = async (pageNumber: number = 1) => await fetchApi<ActorList>({
  endpoint: "reels",
  query: {
    sort: "publishedAt:desc",
    populate: "*",
    "pagination[pageSize]": String(4 * pageNumber),
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching costume page list:", err);
  return null;
});

export const fetchActorItem = async (slug: string) => await fetchApi<ActorList>({
  endpoint: "reels",
  query: {
    filters: { slug: { $eq: slug } },
    populate: "*",
  },
}).then((res) => {
  return res.data[0] ?? null;
}).catch((err) => {
  console.error("Error fetching costumer:", err);
  return null;
});

export const fetchIllustratorPage = await fetchApi<IllustratorPage>({
  endpoint: "illustration-page",
  wrappedByKey: "data",
  query: {
    populate: "*",
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching costume page:", err);
  return null;
});

export const fetchIllustrationsList = async (pageNumber: number = 1) => await fetchApi<IllustrationList>({
  endpoint: "illustrations",
  query: {
    sort: "publishedAt:desc",
    populate: "*",
    "pagination[pageSize]": String(4 * pageNumber),
  },
}).then((res) => {
  return res;
}).catch((err) => {
  console.error("Error fetching illustrations list:", err);
  return null;
});

export const fetchIllustrationItem = async (slug: string) => await fetchApi<IllustrationList>({
  endpoint: "illustrations",
  query: {
    filters: { slug: { $eq: slug } },
    populate: "*",
  },
}).then((res) => {
  return res.data[0] ?? null;
}).catch((err) => {
  console.error("Error fetching illustration:", err);
  return null;
});

