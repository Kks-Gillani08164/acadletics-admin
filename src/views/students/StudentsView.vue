<template>
  <div>
    <data-table
      :loader="loadData"
      :headers="headers"
      title="Students"
      :allowAdd="false"
      @done="$router.back()"
      :delete-handler="service.delete"
      :view-handler="view"
      :key="tab"
    >
      <template #tabs>
        <v-card flat class="mb-5">
          <v-tabs v-model="tab" background-color="white">
            <v-tab v-for="item in items" :key="item.tab">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item.tab"> </v-tab-item>
          </v-tabs-items>
        </v-card>
      </template>
      <template #image="{ item }">
        <v-img
          :src="`http://localhost:3000/uploads/${item.image.name}`"
          class="magazine-image"
        />
      </template>
    </data-table>
  </div>
</template>

<script>
import { StudentsService } from "@/services/students-service"
import DataTable from "../../components/DataTable"

export default {
  name: "SchoolsView",
  components: { DataTable },

  data: () => ({
    tab: 0,
    items: [
      { tab: "All" },
      { tab: "Pending" },
      { tab: "Accepted" },
      { tab: "Rejected" },
      { tab: "Nominated" },
    ],
    loading: false,
    service: new StudentsService(),

    headers: [
      {
        text: "Image",
        value: "image",
        sortable: false,
      },
      {
        text: "Name",
        value: "name",
        sortable: false,
      },
      {
        text: "Type",
        value: "type",
        sortable: false,
      },
      {
        text: "Category",
        value: "category",
        sortable: false,
      },
      {
        text: "Status",
        value: "status",
        sortable: false,
      },
    ],
  }),

  methods: {
    view(item) {
      this.$router.push(`/student-details?id=${item._id}`)
    },

    loadData() {
      switch (this.tab) {
        case 0:
          return this.service.fetchAll()
        case 1:
          return this.service.search("Pending")
        case 2:
          return this.service.search("Accepted")
        case 3:
          return this.service.search("Rejected")
        case 4:
          return this.service.search("Nominated")
        default:
          console.log("Default")
          return this.service.fetchAll()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.magazine-image {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 5px;
}
</style>
