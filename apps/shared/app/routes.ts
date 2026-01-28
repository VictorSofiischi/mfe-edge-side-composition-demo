import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sharedRoute", "routes/sharedRoute.tsx"),
] satisfies RouteConfig;
