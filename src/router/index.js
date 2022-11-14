import Vue from "vue"
import VueRouter from "vue-router"
import DashBoard from "../components/DashBoard"
import MagazinesView from "../views/magazines/MagazinesView"

import SignInView from "../views/auth/SignIn"
import NotFound from "../views/404.vue"

import { magazinesRouter } from "../views/magazines/router"
import { schoolsRouter } from "../views/schools/router"
import { sponsorsRouter } from "../views/sponsors/router"
import { studentsRouter } from "../views/students/router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: DashBoard,
    children: [
      {
        path: "/",
        component: MagazinesView,
      },
      ...magazinesRouter,
      ...schoolsRouter,
      ...sponsorsRouter,
      ...studentsRouter,
    ],
  },
  {
    name: "SignIn",
    path: "/auth/sign-in",
    component: SignInView,
  },
  {
    name: "NotFound",
    path: "**",
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, __, next) => {
  if (!localStorage.getItem("Authenticated")) {
    if (to.path !== "/auth/sign-in") {
      next("/auth/sign-in")
    }
  }

  next()
})

export default router
