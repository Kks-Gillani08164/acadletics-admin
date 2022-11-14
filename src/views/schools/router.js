import SchoolForm from "./SchoolForm"
import SchoolsView from "./SchoolsView"

export const schoolsRoutes = [
  {
    name: "SchoolsView",
    path: "/schools",
    component: SchoolsView,
  },

  {
    name: "SchoolForm",
    path: "/school",
    component: SchoolForm,
  },
]

export const schoolsRouter = schoolsRoutes.filter(function (x) {
  return x !== null
})
