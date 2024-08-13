import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Toolbar from "../views/Toolbar.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  {
    path: "",
    name: "toolbar",
    component: Toolbar,
    children: [
      {
        path: "/test",
        name: "test",
        component: () => import("../components/Test.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
