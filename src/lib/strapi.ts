import { STRAPI_URL } from "../constants/strapi";

type QueryValue = string | string[] | Record<string, any>;

interface Props {
  endpoint: string;
  query?: Record<string, QueryValue>;
  fields?: string[];
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
  endpoint,
  query,
  fields,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

  const appendNested = (prefix: string, val: any) => {
    if (val === undefined || val === null) return;
    if (Array.isArray(val)) {
      val.forEach((v, i) => {
        const nextKey = `${prefix}[${i}]`;
        if (v !== null && typeof v === "object") {
          appendNested(nextKey, v);
        } else {
          url.searchParams.append(nextKey, String(v));
        }
      });
      return;
    }
    if (typeof val === "object") {
      Object.entries(val).forEach(([k, v]) => appendNested(`${prefix}[${k}]`, v));
      return;
    }
    url.searchParams.append(prefix, String(val));
  };

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (key === "filters" && value && typeof value === "object" && !Array.isArray(value)) {
        appendNested("filters", value);
        return;
      }

      if (Array.isArray(value)) {
        // Special handling for indexed array params: e.g. populate[0], fields[0]
        if (key === "populate" || key === "fields") {
          value.forEach((v, index) => {
            url.searchParams.append(`${key}[${index}]`, v);
          });
        } else {
          value.forEach((v) => {
            url.searchParams.append(key, v);
          });
        }
      } else if (value && typeof value === "object") {
        appendNested(key, value);
      } else if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  if (fields && fields.length > 0) {
    fields.forEach((field, index) => {
      url.searchParams.append(`fields[${index}]`, field);
    });
  }

  const res = await fetch(url.toString());
  
  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}