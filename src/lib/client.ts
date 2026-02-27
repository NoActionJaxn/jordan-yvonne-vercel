import { createClient } from "@sanity/client";

function getEnv(key: string): string {
  // In SSR, process.env is available; in client bundles, Vite inlines VITE_ vars
  if (typeof process !== "undefined" && process.env[key]) {
    return process.env[key] as string;
  }
  // Fallback to VITE_ prefixed for backward compat during dev
  const viteKey = `VITE_${key}`;
  if (typeof process !== "undefined" && process.env[viteKey]) {
    return process.env[viteKey] as string;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const importMeta = (import.meta as any).env;
  return importMeta?.[viteKey] ?? importMeta?.[key] ?? "";
}

const projectId = getEnv("PROJECT_ID");
const dataset = getEnv("DATASET");
const apiVersion = getEnv("API_VERSION");
const useCdn = getEnv("USE_CDN") === "true";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});
