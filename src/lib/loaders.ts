import type { LoaderFunctionArgs } from "react-router";
import { fetchLandingPage, fetchMenu, fetchSiteInfo, fetchSocials, fetchCostumePage, fetchActorPage, fetchIllustratorPage, fetchCostumeList, fetchCostumeItem, fetchIllustrationsList, fetchIllustrationItem, fetchActorList, fetchActorItem } from "./requests";
import type { DefaultLayoutData, LandingPageData, CostumingPageData, ActorPageData, IllustratorPageData } from "../types/loaders";

export const defaultLayoutLoader = async (): Promise<DefaultLayoutData> => {
  return {
    siteInfo: fetchSiteInfo,
    menu: fetchMenu,
    socials: fetchSocials,
  };
};

export const landingPageLoader = async (): Promise<LandingPageData> => {
  return {
    siteInfo: fetchSiteInfo,
    landingPage: fetchLandingPage,
  };
};

export const costumePageLoader = async ({ request }: LoaderFunctionArgs<unknown>): Promise<CostumingPageData> => {
  const url = new URL(request.url);
  const pageCount = url.searchParams.get("pageCount") ?? 1;

  return {
    siteInfo: fetchSiteInfo,
    costumePage: fetchCostumePage,
    costumeList: await fetchCostumeList(Number(pageCount)),
  };
};

export const costumeItemLoader = async ({ params }: LoaderFunctionArgs<unknown>): Promise<unknown> => {
  const { slug } = params;

  return {
    siteInfo: fetchSiteInfo,
    costumeItem: await fetchCostumeItem(slug ?? ""),
  };
};

export const actorPageLoader = async ({ request }: LoaderFunctionArgs<unknown>): Promise<ActorPageData> => {
  const url = new URL(request.url);
  const pageCount = url.searchParams.get("pageCount") ?? 1;

  return {
    siteInfo: fetchSiteInfo,
    actorPage: fetchActorPage,
    actorList: await fetchActorList(Number(pageCount)),
  };
};



export const actorItemLoader = async ({ params }: LoaderFunctionArgs<unknown>): Promise<unknown> => {
  const { slug } = params;

  return {
    siteInfo: fetchSiteInfo,
    actorItem: await fetchActorItem(slug ?? ""),
  };
};

export const illustrationItemLoader = async ({ params }: LoaderFunctionArgs<unknown>): Promise<unknown> => {
  const { slug } = params;

  return {
    siteInfo: fetchSiteInfo,
    illustrationItem: await fetchIllustrationItem(slug ?? ""),
  };
};

export const illustratorPageLoader = async ({ request }: LoaderFunctionArgs<unknown>): Promise<IllustratorPageData> => {
  const url = new URL(request.url);
  const pageCount = url.searchParams.get("pageCount") ?? 1;

  return {
    siteInfo: fetchSiteInfo,
    illustratorPage: fetchIllustratorPage,
    illustrationsList: await fetchIllustrationsList(Number(pageCount)),
  };
};
