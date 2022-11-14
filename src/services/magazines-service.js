import axios from "axios"

export class MagazinesService {
  async fetchAll() {
    return (await axios.get("/magazine")).data
  }

  async fetchOne(id) {
    return (await axios.get("/magazine/" + id)).data
  }

  async create(magazine) {
    return (await axios.post("/magazine", magazine)).data
  }

  async deleteFile(name) {
    return (await axios.post("/delete-image/" + name)).data
  }

  async delete(magazine) {
    await axios.post("/delete-image/" + magazine.file.name)
    await axios.post("/delete-image/" + magazine.image.name)
    return (await axios.delete(`/magazine/${magazine._id}`)).data
  }

  async update(magazine) {
    return (await axios.patch(`/magazine/${magazine._id}`, magazine)).data
  }

  async saveFile(file) {
    const formData = new FormData()
    formData.append("file", file)
    return (await axios.post("/save-image", formData)).data
  }
}
