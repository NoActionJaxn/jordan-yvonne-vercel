// Re-export what consumers should use from the typed modules, avoiding name clashes
export type {
	SeoQueryData,
	SiteInfo as SeoSiteInfo,
} from "./graphql/fetchSeo";

export {
	fetchSeoQuery,
} from "./graphql/fetchSeo";

export type {
	SiteInfoQueryData,
	SiteInfo,
} from "./graphql/fetchSiteInfo";

export {
	fetchSiteInfoQuery,
} from "./graphql/fetchSiteInfo";

