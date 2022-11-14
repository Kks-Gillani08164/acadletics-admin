<template>
  <v-container class="d-flex justify-center">
    <v-card v-if="item" width="820" class="details-container">
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <v-img
            :src="`http://localhost:3000/uploads/${item.image.name}`"
            class="student-image mx-auto"
          />
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <h5 class="text-h5 font-weight-medium mt-3 detail-heading">
            Student Details
          </h5>
          <div class="mt-5" v-for="(i, index) in 5" :key="index">
            <span
              class="font-weight-bold"
              :class="{ 'primary-color': itemKeys[i - 1] === 'status' }"
              >{{ `${toCapitalizeCase(itemKeys[i - 1])}:` }}
            </span>
            <span
              class="font-small"
              :class="{ 'primary-color': itemKeys[i - 1] === 'status' }"
              >{{
                itemKeys[i - 1] !== "school"
                  ? toCapitalizeCase(item[itemKeys[i - 1]])
                  : toCapitalizeCase(item[itemKeys[i - 1]].name)
              }}</span
            >
          </div>
        </v-col>

        <v-col cols="12" class="mt-2">
          <h5 class="text-h5 font-weight-medium mt-3 detail-heading">
            Other Details
          </h5>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <div class="mt-5" v-if="item.bio">
            <span class="font-weight-bold">BIO: </span>
            <span class="font-small">{{ item.bio }}</span>
          </div>
          <div class="mt-5" v-if="item.subject">
            <span class="font-weight-bold">Subject for Honor: </span>
            <span class="font-small">{{ item.subject }}</span>
          </div>
          <div class="mt-5" v-if="item.vacationSpot">
            <span class="font-weight-bold">Vacation Spot: </span>
            <span class="font-small">{{ item.vacationSpot }}</span>
          </div>
          <div class="mt-5" v-if="item.nomination?.nominationType">
            <span class="font-weight-bold">Nomination Type: </span>
            <span class="font-small">{{
              item.nomination?.nominationType
            }}</span>
          </div>
          <div class="mt-5" v-if="item.nomination?.date">
            <span class="font-weight-bold">Nomination Date: </span>
            <span class="font-small">{{ item.nomination?.date }}</span>
          </div>
          <div class="mt-5" v-if="item.summary">
            <span class="font-weight-bold">Summary: </span>
            <span class="font-small">{{ item.summary }}</span>
          </div>
        </v-col>

        <v-col cols="12" md="6" sm="12">
          <div class="mt-5" v-if="item.favoriteHobbies">
            <span class="font-weight-bold">Hobbies: </span>
            <span class="font-small">{{ item.favoriteHobbies }}</span>
          </div>
          <div class="mt-5" v-if="item.favoriteMovies">
            <span class="font-weight-bold">Movies: </span>
            <span class="font-small">{{ item.favoriteMovies }}</span>
          </div>
          <div class="mt-5" v-if="item.favoriteSong">
            <span class="font-weight-bold">Songs: </span>
            <span class="font-small">{{ item.favoriteSong }}</span>
          </div>
          <div class="mt-5" v-if="item.favoriteTvShow">
            <span class="font-weight-bold">TV Show: </span>
            <span class="font-small">{{ item.favoriteTvShow }}</span>
          </div>
          <div class="mt-5" v-if="item.favoriteFood">
            <span class="font-weight-bold">Food: </span>
            <span class="font-small">{{ item.favoriteFood }}</span>
          </div>
          <div class="mt-5" v-if="item.futurePlan">
            <span class="font-weight-bold">Future Plan: </span>
            <span class="font-small">{{ item.futurePlan }}</span>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <loading-dialog v-model="loading" message="Fetching User Data" />
  </v-container>
</template>
<script>
import LoadingDialog from "../../components/LoadingDialog"
import { StudentsService } from "@/services/students-service"
export default {
  name: "StudentDetail",
  components: { LoadingDialog },
  mounted() {
    this.loadData()
  },
  data() {
    return {
      loading: false,
      service: new StudentsService(),
      item: "",
      errorValue: "",
      error: false,
      itemKeys: ["status", "name", "type", "category", "school"],
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
    toCapitalizeCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
<style lang="scss" scoped>
.details-container {
  padding: 20px;
}
.student-image {
  width: 400px;
  border-radius: 5px;
}

.detail-heading {
  color: #4173a3;
}
.primary-color {
  color: #4173a3;
}

.font-small {
  font-size: 0.9rem;
}
</style>
