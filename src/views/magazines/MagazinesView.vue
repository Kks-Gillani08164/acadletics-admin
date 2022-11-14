<template>
  <data-table
    :loader="loadData"
    :headers="headers"
    title="Magazines"
    :allow-add="true"
    @add-new="addNew"
    @done="$router.back()"
    :delete-handler="service.delete"
    :edit-handler="edit"
    :view-handler="view"
  >
    <template #image="{ item }">
      <v-img
        :src="`http://localhost:3000/uploads/${item.image.name}`"
        class="magazine-image"
      />
    </template>
    <template #createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>
  </data-table>
</template>

<script>
import dayjs from "dayjs"
import { MagazinesService } from "@/services/magazines-service"
import DataTable from "../../components/DataTable"

export default {
  components: { DataTable },

  data: () => ({
    service: new MagazinesService(),

    headers: [
      {
        text: "Image",
        value: "image",
        sortable: false,
        width: 100,
      },
      {
        text: "Name",
        value: "name",
        sortable: false,
        width: 220,
      },
      {
        text: "Type",
        value: "type",
        sortable: false,
      },
      {
        width: 180,
        text: "Created At",
        value: "createdAt",
      },
    ],
  }),

  methods: {
    formatDate(date) {
      return dayjs(date).format("D MMM YYYY - hh:mm a")
    },

    addNew() {
      this.$router.push("/magazine")
    },
    edit(item) {
      this.$router.push(`/magazine?id=${item._id}`)
    },
    view(item) {
      this.$router.push(`/magazine-details?id=${item._id}`)
    },

    loadData() {
      return this.service.fetchAll()
    },
  },
}
</script>

<style scoped>
.magazine-image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 5px;
}
</style>
