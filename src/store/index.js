import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
  },
  getters: {
    isAuthenticated(state) {
      return state.authenticated
    },
  },
  mutations: {
    AUTHENTICATE(state, value) {
      console.log(value)
      state.authenticated = value
    },
  },
  actions: {},
  modules: {},
})
