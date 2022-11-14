import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import axios from "axios"

Vue.config.productionTip = false

import "./assets/style.scss"

Vue.prototype.$axios = axios

axios.defaults.baseURL = "http://localhost:3000"

// axios.defaults.headers["content-type"] = "multipart/form-data"

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          break
      }
      return Promise.reject(error.response)
    }
  }
)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")
