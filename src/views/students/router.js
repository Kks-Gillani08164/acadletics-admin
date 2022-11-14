import StudentsView from "./StudentsView"
import StudentDetail from "./StudentDetail"

export const studentsRoutes = [
  {
    name: "StudentsView",
    path: "/students",
    component: StudentsView,
  },

  {
    name: "StudentDetail",
    path: "/student-details",
    component: StudentDetail,
  },
]

export const studentsRouter = studentsRoutes.filter(function (x) {
  return x !== null
})
