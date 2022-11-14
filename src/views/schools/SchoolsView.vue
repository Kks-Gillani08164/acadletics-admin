<template>
  <data-table
    :loader="loadData"
    :headers="headers"
    title="Schools"
    :allow-add="true"
    @add-new="addNew"
    @done="$router.back()"
    :delete-handler="service.delete"
    :edit-handler="edit"
  >
  </data-table>
</template>

<script>
import { SchoolsService } from "@/services/schools-service"
import DataTable from "../../components/DataTable"

export default {
  name: "SchoolsView",
  components: { DataTable },

  data: () => ({
    loading: false,
    service: new SchoolsService(),

    headers: [
      {
        text: "Name",
        value: "name",
        sortable: false,
      },
      {
        text: "Website",
        value: "website",
        sortable: false,
      },
    ],
  }),

  methods: {
    addNew() {
      this.$router.push("/school")
    },
    edit(item) {
      this.$router.push(`/school?id=${item._id}`)
    },

    loadData() {
      return this.service.fetchAll()
    },
  },
}
</script>
