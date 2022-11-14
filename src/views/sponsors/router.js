import SponsorForm from "./SponsorForm"
import SponsorsView from "./SponsorsView"

export const sponsorsRoutes = [
  {
    name: "SponsorsView",
    path: "/sponsors",
    component: SponsorsView,
  },

  {
    name: "SponsorForm",
    path: "/sponsor",
    component: SponsorForm,
  },
]

export const sponsorsRouter = sponsorsRoutes.filter(function (x) {
  return x !== null
})
