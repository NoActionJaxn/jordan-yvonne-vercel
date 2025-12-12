export const SITE_SETTINGS_QUERY = `
*[_id == "siteSettings"][0]{
  _createdAt,
  _updatedAt,
  _id,
  title,
  logo,
  alternateLogo,
  favicon,
}
`;

export const DEFAULT_SEO_QUERY = `
*[_id == "siteSettings"][0]{
  defaultSEO
}
`;

export const MENU_ITEMS_QUERY = `
*[_id == "siteSettings"][0]{
  menuItems
}
`;

export const SOCIAL_LINKS_QUERY = `
*[_id == "siteSettings"][0]{
  socialLinks
}
`;

export const LANDING_PAGE_QUERY = `
*[_id == "landingPage"][0] {
  _createdAt,
  _updatedAt,
  _id,
  description,
  pageTitle,
  seo,
  title
}
`;