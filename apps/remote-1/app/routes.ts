import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("jurisdiction", "routes/jurisdiction.tsx"),
] satisfies RouteConfig;
