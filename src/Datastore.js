import Vue from "vue";
import Vuex from "vuex";
// import RpgtoolsApiService from "./RpgtoolsApiService";

// const omfApiEndpoint =
//   process.env.VUE_APP_RPGTOOLS_API_ENDPOINT || window.location.origin;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    access_token: localStorage.getItem("access_token")
  },
  getters: {
    /* ------------------------ user related state  ------------------------ */
    isSignedOut: state => {
      return !state.access_token;
    },
    isSignedIn: state => {
      return !!state.access_token;
    },
    username: state => state.user.username,
    getCurrentUser: state => state.user
  },
  mutations: {},
  actions: {}
});
