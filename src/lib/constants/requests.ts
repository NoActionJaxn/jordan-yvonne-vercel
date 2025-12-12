export const SITE_SETTINGS_QUERY = `
*[_id == "siteSettings"][0]{
  _createdAt,
  _updatedAt,
  _id,
  title,
  logo,
  alternateLogo,
  favicon
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

export const COSTUME_PAGE_QUERY = `
*[_id == "costumePage"][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  pageTitle,
  description,
  resumeFile,
  seo
}
`;

export const COSTUME_PAGE_SEO_QUERY = `
*[_id == "costumePage"][0] {
  seo
}
`;

export const COSTUMES_QUERY = `
*[_type == "costume"] | order(_createdAt asc) [0..$limit] {
  _id,
  _createdAt,
  _publishedAt,
  title,
  slug,
  description,
  galleryImages,
  seo
} 
`;

export const TOTAL_COSTUMES_QUERY = `
count(*[_type == "costume"])
`;

export const COSTUME_BY_SLUG_QUERY = `
*[_type == "costume" && slug.current == $slug][0] {
  _id,
  _createdAt,
  _publishedAt,
  title,
  slug,
  description,
  galleryImages,
  seo
}
`;

