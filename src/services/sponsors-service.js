import axios from "axios"

export class SponsorsService {
  async fetchAll() {
    return (await axios.get("/sponsor")).data
  }

  async fetchOne(id) {
    return (await axios.get("/sponsor/" + id)).data
  }

  async create(sponsor) {
    return (await axios.post("/sponsor", sponsor)).data
  }

  async delete(sponsor) {
    return (await axios.delete(`/sponsor/${sponsor._id}`)).data
  }

  async update(sponsor) {
    return (await axios.patch(`/sponsor/${sponsor._id}`, sponsor)).data
  }

  async saveFile(file) {
    const formData = new FormData()
    formData.append("file", file)
    return (await axios.post("/save-image", formData)).data
  }
}
