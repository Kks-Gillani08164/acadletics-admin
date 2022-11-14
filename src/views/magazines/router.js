import MagazineForm from "./MagazineForm"
import MagazineDetail from "./MagazineDetail"

const magazinesRoutes = [
  {
    name: "MagazineForm",
    path: "/magazine",
    component: MagazineForm,
  },
  {
    name: "UpdateMagazine",
    path: "/magazine/:id",
    component: MagazineForm,
  },
  {
    name: "MagazineDetail",
    path: "/magazine-details",
    component: MagazineDetail,
  },
]

export const magazinesRouter = magazinesRoutes.filter(function (x) {
  return x !== null
})
