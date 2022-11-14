import axios from "axios"

export class SchoolsService {
  async fetchAll() {
    return (await axios.get("/school")).data
  }

  async fetchOne(id) {
    return (await axios.get("/school/" + id)).data
  }

  async create(school) {
    return (await axios.post("/school", school)).data
  }

  async delete(school) {
    return (await axios.delete(`/school/${school._id}`)).data
  }

  async update(school) {
    return (await axios.patch(`/school/${school._id}`, school)).data
  }
}
