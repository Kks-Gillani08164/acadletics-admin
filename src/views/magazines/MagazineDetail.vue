<template>
  <v-container class="d-flex justify-center">
    <v-card v-if="item" width="820" class="details-container">
      <div class="image-container">
        <a
          :href="`http://localhost:3000/uploads/${item.image.name}`"
          target="_blank"
        >
          <v-img
            :src="`http://localhost:3000/uploads/${item.image.name}`"
            class="image"
          ></v-img>
        </a>
      </div>
      <h5 class="text-h5 font-weight-medium mt-7 detail-heading">
        Magazine Detail
      </h5>
      <div class="mt-7 d-flex justify-space-between">
        <div>
          <span class="font-weight-bold">File(PDF): </span>
          <a
            :href="`http://localhost:3000/uploads/${item.file.name}`"
            target="_blank"
            >Preview PDF</a
          >
        </div>
        <div>
          <span class="font-weight-bold">Name: </span>
          <span class="font-small">{{ item.name }}</span>
        </div>
        <div>
          <span class="font-weight-bold">Type: </span>
          <span class="font-small">{{ item.type }}</span>
        </div>
      </div>
      <div class="mt-7">
        <span class="font-weight-bold">Description: </span>
        <span class="font-small">{{ item.description }}</span>
      </div>
    </v-card>
    <loading-dialog v-model="loading" message="Fetching User Data" />
  </v-container>
</template>
<script>
import LoadingDialog from "../../components/LoadingDialog"
import { MagazinesService } from "@/services/magazines-service"
export default {
  components: { LoadingDialog },
  mounted() {
    this.loadData()
  },
  data() {
    return {
      loading: false,
      service: new MagazinesService(),
      item: "",
      errorValue: "",
      error: false,
    }
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        this.item = await this.service.fetchOne(this.$route.query.id)
        this.loading = false
      } catch (e) {
        this.loading = false
        this.errorValue = {
          title: "Error while loading data",
          description: e?.response?.data?.error ?? "Some Error occurred",
        }
        this.error = true
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.details-container {
  padding: 40px;
}

.image-container {
  width: 400px;

  margin: 0 auto;
}

.image {
  width: 100%;
  border-radius: 0.5rem;
}

.detail-heading {
  color: #4173a3;
}

.font-small {
  font-size: 0.9rem;
}
</style>
