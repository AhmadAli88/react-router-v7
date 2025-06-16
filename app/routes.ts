import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
    route("post/:postId", "routes/post.tsx"),
    layout("routes/dashboard.tsx",[
      ...prefix("ahmad", [
    route("finances", "routes/finances.tsx"),
    route("personalInfo", "routes/personalInfo.tsx"),
      ])
    ]),
] satisfies RouteConfig;
