<template>
  <div>
    <v-menu bottom origin="center center" transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          color="#F5C187"
          dark
          v-bind="attrs"
          v-on="on"
          tile
          class="rounded-lg profile"
        >
          A
        </v-avatar>
      </template>

      <v-card class="pa-3" height="225" width="290">
        <div class="d-flex align-center flex-column">
          <v-avatar
            class="text-h4"
            color="#F5C187"
            size="80"
            style="font-size: 2rem"
          >
            A
          </v-avatar>
          <v-card-title>admin</v-card-title>
          <v-card-subtitle>admin@acadletics.com</v-card-subtitle>
        </div>
        <v-divider class="mt-n2 mb-2" />
        <v-btn depressed color="black float-right" dark @click="logout"
          >Logout</v-btn
        >
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: "ProfilePopup",
  methods: {
    logout() {
      localStorage.removeItem("Authenticated")

      this.$router.push("/auth/sign-in")
    },
  },
}
</script>
<style lang="scss" scoped>
.profile {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 10px;
  font-size: 2rem;
}
</style>
