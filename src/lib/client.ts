import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_PROJECT_ID satisfies string;
const dataset = import.meta.env.VITE_DATASET satisfies string;
const apiVersion = import.meta.env.VITE_API_VERSION satisfies string;
const useCdn = import.meta.env.VITE_USE_CDN satisfies boolean;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});
