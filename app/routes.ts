import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/", "routes/home.tsx"),
    route("costuming", "routes/costuming.tsx"),
    route("costuming/:slug", "routes/costuming-slug.tsx"),
    route("acting", "routes/acting.tsx"),
    route("acting/:slug", "routes/acting-slug.tsx"),
    route("art", "routes/art.tsx"),
    route("art/:slug", "routes/art-slug.tsx"),
  ]),
] satisfies RouteConfig;
