import { fetchSiteInfo } from "./requests";

export const defaultLayoutLoader = async (): Promise<unknown> => {
  const siteInfo = fetchSiteInfo;
  
  return {
    siteInfo
  };
};
