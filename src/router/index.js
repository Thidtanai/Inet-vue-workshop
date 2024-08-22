import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Toolbar from "../views/Toolbar.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/home", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
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
      {
        path: "/mycart",
        name: "mycart",
        component: () => import("../views/MyCart.vue"),
      },
      {
        path: "/manage",
        name: "manage",
        component: () => import("../views/ProductManage.vue"),
      },
      {
        path: "/approve",
        name: "approve",
        component: () => import("../views/Approve.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
