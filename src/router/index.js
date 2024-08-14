import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Toolbar from "../views/Toolbar.vue";
import Login from "../views/Login.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/login", name: "login", component: Login },
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
      {
        path: "/product",
        name: "product",
        component: () => import("../views/ProductList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
