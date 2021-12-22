import { RouteRecordRaw, RouterView } from "vue-router";
import getRoutesName from "../utils/get-routes-name";

const cssDemoRoutes = [
  {
    name: "CSSDemo",
    path: "/css-demo",
    redirect: { name: "Math" },
    component: RouterView,
    children: [
      {
        name: "Math",
        path: "math",
        component: () => import("../views/css-demo/math/index.vue"),
      },
    ],
  },
] as RouteRecordRaw[];

export const cssDemoRoutesName = getRoutesName(cssDemoRoutes);

export default cssDemoRoutes;
