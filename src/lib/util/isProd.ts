import { ENVIRONMENT } from "../../constants/environment";

export function isProd() {
  return ENVIRONMENT === "production";
}