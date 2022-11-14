<template>
  <div>
    <v-app-bar app color="#4173A3" dark elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-card-title>Academics and Athletics</v-card-title>
      <v-spacer />
      <profile-popup />
    </v-app-bar>
    <v-main class="main-bg">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" app>
      <img src="../assets/logo.png" alt="logo" class="logo" height="70" />
      <v-divider />
      <template v-for="(route, index) in routes">
        <v-list-item
          v-if="route.isVisible"
          :key="index"
          class="route"
          color="#da57a7"
          active-class="route--active"
          exact
          dense
          :to="route.to"
        >
          <v-list-item-icon>
            <v-icon v-text="route.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="route.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider
          :key="index + routes.length"
          v-else-if="route.isDivider"
          style="margin: 10px 20px"
        />
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import ProfilePopup from "./ProfilePopup.vue"
export default {
  components: { ProfilePopup },
  data: () => ({
    drawer: true,
    user: {},
    developMode: false,
    developModeDialog: false,
    message: null,
    developModeData: null,
    loading: false,
  }),
  methods: {},
  computed: {
    routes() {
      return [
        {
          to: "/",
          title: "Magazines",
          icon: "mdi-book",
          isVisible: true,
        },
        { isDivider: true },
        {
          to: "/schools",
          title: "Schools",
          icon: "mdi-city",
          isVisible: true,
        },
        { isDivider: true },
        {
          to: "/students",
          title: "Students",
          icon: "mdi-account-school",
          isVisible: true,
        },
        { isDivider: true },
        {
          to: "/sponsors",
          title: "Sponsors",
          icon: "mdi-currency-usd",
          isVisible: true,
        },
      ]
    },
  },
}
</script>
<style lang="scss" scoped>
.logo {
  display: block;
  margin: 5px auto;
  border-radius: 10px;
}
.route {
  margin: 5px;
  text-align: left;
  overflow: hidden;
  border-radius: 4px;
  font-size: 20px !important;
  font-family: "Roboto", sans-serif;

  i {
    font-size: 20px;
  }
  &--active i {
    color: inherit;
  }
  &--active {
    color: #495db7;
  }
}
.main-bg {
  background: linear-gradient(to bottom, #4173a3 300px, white 300px);
}
</style>
