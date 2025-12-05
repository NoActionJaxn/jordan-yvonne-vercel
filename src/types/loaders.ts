import type { ActorItem, ActorList, ActorPage, CostumeItem, CostumeList, CostumePage, IllustrationItem, IllustrationList, IllustratorPage, LandingPage, Menu, SiteInfo, Socials } from "./requests";

export interface DefaultLayoutData {
  siteInfo: SiteInfo | null;
  menu: Menu | null;
  socials: Socials | null;
};

export interface LandingPageData {
  siteInfo: SiteInfo | null;
  landingPage: LandingPage | null;
};

export interface CostumingPageData {
  siteInfo: SiteInfo | null;
  costumePage: CostumePage | null;
  costumeList: CostumeList | null;
};

export interface CostumeItemPageData {
  siteInfo: SiteInfo | null;
  costumeItem: CostumeItem | null;
};

export interface ActorPageData {
  siteInfo: SiteInfo | null;
  actorPage: ActorPage | null;
  actorList: ActorList | null;
};

export interface ActorItemPageData {
  siteInfo: SiteInfo | null;
  actorItem: ActorItem | null;
};

export interface IllustratorPageData {
  siteInfo: SiteInfo | null;
  illustratorPage: IllustratorPage | null;
  illustrationsList?: IllustrationList | null;
};

export interface IllustrationItemPageData {
  siteInfo: SiteInfo | null;
  illustrationItem: IllustrationItem | null;
};