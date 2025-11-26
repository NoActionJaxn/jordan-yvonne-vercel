import { gql } from "@apollo/client";

export const fetchSocialsQuery = gql`
query SiteInfo {
  siteInfo {
    socials {
      menu_items {
        label
        url
        icon {
          name
          pack
        }
      }
    }
  }
}`;