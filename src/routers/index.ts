import { createRouter, createWebHistory } from "vue-router";
import getRoutesName from "../utils/get-routes-name";
import cssDemoRoutes, { cssDemoRoutesName } from "./css-demo-routes";
import cssRoutes, { cssRoutesName } from "./css-routes";
import workTestRoutes, { workTestRoutesName } from "./work-test-routes";

const home = [
  { name: "Home", path: "/", component: () => import("../views/home.vue") },
  {
    name: "404",
    path: "/:match(.*)*",
    component: () => import("../views/404.vue"),
  },
];

export const homeRoutesName = getRoutesName(home);

export const routesName = [
  ...cssDemoRoutesName,
  ...cssRoutesName,
  ...workTestRoutesName,
  ...homeRoutesName,
];

const routes = [...cssDemoRoutes, ...cssRoutes, ...workTestRoutes, ...home];

export default createRouter({
  history: createWebHistory(),
  routes,
});
