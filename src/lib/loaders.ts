import client from "./graphql/client";
import { fetchSeoQuery, type SeoQueryData } from "./graphql/fetchSeo";
import { fetchSiteInfoQuery, type SiteInfoQueryData } from "./graphql/fetchSiteInfo";

interface GraphQLQueryResult<T> {
  data?: T & {
    siteInfo?: unknown;
  };
}

export interface DefaultLayoutData {
  siteSeo: SeoQueryData["siteInfo"];
  siteInfo: SiteInfoQueryData["siteInfo"];
}

export const defaultLayoutLoader = async (): Promise<DefaultLayoutData> => {
  const seoResult = await client.query<GraphQLQueryResult<SeoQueryData>>({
    query: fetchSeoQuery,
  });

  const siteInfoResult = await client.query<GraphQLQueryResult<SiteInfoQueryData>>({
    query: fetchSiteInfoQuery,
  });

  return {
    siteSeo: seoResult.data?,
    siteInfo: siteInfoResult.data?.siteInfo,
  };
};
