import axios from "axios"

export class StudentsService {
  async fetchAll() {
    return (await axios.get("/student")).data
  }

  async fetchOne(id) {
    return (await axios.get("/student/" + id)).data
  }

  async search(status) {
    return (await axios.get("/student/status/" + status)).data
  }

  async delete(student) {
    return (await axios.delete(`/student/${student._id}`)).data
  }
}
