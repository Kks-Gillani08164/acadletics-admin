<template>
  <data-table
    :loader="loadData"
    :headers="headers"
    title="Sponsors"
    :allow-add="true"
    @add-new="addNew"
    @done="$router.back()"
    :delete-handler="service.delete"
  >
    <template #logo="{ item }">
      <v-img
        :src="`http://localhost:3000/uploads/${item.logo.name}`"
        class="magazine-image"
      />
    </template>
  </data-table>
</template>

<script>
import { SponsorsService } from "@/services/sponsors-service"
import DataTable from "../../components/DataTable"

export default {
  name: "SponsorView",
  components: { DataTable },

  data: () => ({
    loading: false,
    service: new SponsorsService(),

    headers: [
      {
        text: "Logo",
        value: "logo",
        sortable: false,
      },
      {
        text: "Name",
        value: "name",
        sortable: false,
      },
      {
        text: "Link",
        value: "link",
        sortable: false,
      },
    ],
  }),

  methods: {
    addNew() {
      this.$router.push("/sponsor")
    },
    edit(item) {
      this.$router.push(`/sponsor?id=${item._id}`)
    },

    loadData() {
      return this.service.fetchAll()
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
