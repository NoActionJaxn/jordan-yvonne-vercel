import { gql } from "@apollo/client";

export type SiteInfoQueryVariables = Record<string, never>;

export type SiteInfoQuery = {
  siteInfo: {
    menu: {
      menu_items: {
        label: string;
        url: string;
      }[];
    };
  };
};

export const fetchMenuQuery = gql`
query SiteInfo {
  siteInfo {
    menu {
      menu_items {
        label
        url
      }
    }
  }
}`;