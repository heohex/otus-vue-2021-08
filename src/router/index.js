import { createRouter, createWebHistory } from "vue-router";
import Episodes from "../views/Episodes.vue";

const routes = [
  {
    path: "/",
    name: "Episodes",
    component: Episodes,
  },
  {
    path: "/characters",
    name: "Characters",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Characters.vue"),
  },
  {
    path: "/locations",
    name: "Locations",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Locations.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
