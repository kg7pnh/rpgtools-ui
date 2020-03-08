import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import RpgtoolsApiService from "./RpgtoolsApiService";

// const parseLinkHeader = require("parse-link-header");
const rpgtoolsApiEndpoint =
  process.env.VUE_APP_RPGTOOLS_API_ENDPOINT || window.location.origin;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // system state
    access_token: localStorage.getItem("access_token"),
    user: {},
    error: "",

    // ActionResult state
    actionResults: {},

    // Book state
    book: {},
    bookHistory: [],
    books: [],

    // BookFomat state
    bookformat: {},
    bookFormatHistory: [],
    bookformats: [],

    // Contributors state
    contributors: [],

    // Game state
    game: {},
    gameHistory: [],
    games: [],

    // GameSystem state
    gamesystem: {},
    gameSystemHistory: [],
    gamesystems: [],

    // Person state
    person: {},
    personHistory: [],
    persons: [],

    // Organization state
    organization: {},
    organizationHisotry: [],
    organizations: [],

    // Publisher state
    publisher: {},
    publisherHistory: [],
    publishers: [],

    // Workflow state
    workflow: {},
    workflowHistory: [],
    workflows: []
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
  mutations: {
    setAccessToken(state, access_token) {
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        state.access_token = access_token;
      } else {
        localStorage.removeItem("access_token");
        state.access_token = "";
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    setError(state, error) {
      state.error = error;
    },
    setActionResults(state, context) {
      let actionResults = context.actionResults;
      state.actionResults = actionResults;
      console.log(JSON.stringify(state.actionResults));
    },
    setItems(state, context) {
      let itemsType = context.itemsType;
      let data = context.data;
      state[itemsType] = data;
    },
    setItemHistory(state, context) {
      let itemHistoryState = context.itemHistoryState;
      let itmeHistory = context.itmeHistory;
      state[itemHistoryState] = itmeHistory;
    }
  },
  actions: {
    deleteItem({ dispatch, state }, context) {
      if (state.access_token) {
        let item = context.item;
        let itemsPath = context.itemsPath;
        let endPoint = "";
        endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/delete/${
          item.id
        }`;
        let method = "delete";
        return axios({
          method: method,
          url: endPoint,
          headers: { Authorization: "Bearer " + state.access_token }
        })
          .then(() => {
            return Promise.resolve(
              dispatch({
                type: "getItems",
                itemsPath: itemsPath
              })
            );
          })
          .catch(error => {
            return Promise.resolve(dispatch("handleRequestError", error));
          });
      }
    },
    getItems({ commit, state, dispatch }, context) {
      if (state.access_token) {
        let itemsPath = context.itemsPath;
        let endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}`;
        let header = {
          headers: { Authorization: "Bearer " + state.access_token }
        };
        return axios
          .get(endPoint, header)
          .then(response => {
            let items = response.data;
            return Promise.resolve(
              commit({
                type: "setItems",
                itemsType: itemsPath,
                data: items
              })
            );
          })
          .catch(error => {
            return Promise.resolve(dispatch("handleRequestError", error));
          });
      }
    },
    getItemHistory({ commit, dispatch }, context) {
      let item = context.item;
      let itemsPath = context.itemsPath;
      let itemHistoryState = context.itemHistoryState;
      let endPoint = "";
      endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/${
        item.id
      }/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let itemHistory = response.data;
          return Promise.resolve(
            commit({
              type: "setItemHistory",
              itmeHistory: itemHistory,
              itemHistoryState: itemHistoryState
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getUserInfo({ state, commit, dispatch }) {
      if (state.access_token) {
        let apiEndpoint = `${rpgtoolsApiEndpoint}/api/v1/current-user`;
        let header = {
          headers: { Authorization: "Bearer " + state.access_token }
        };
        return axios
          .get(apiEndpoint, header)
          .then(function(response) {
            let user = response.data;
            if (user.is_authenticated) {
              return Promise.resolve(commit("setUser", user));
            }
          })
          .catch(error => {
            return Promise.resolve(dispatch("handleRequestError", error));
          });
      }
    },
    handleRequestError({ commit }, error) {
      let error_string = error.response
        ? `Error: ${error.response.status}, ${error.response.statusText}`
        : error.toString();
      commit("setError", error_string);
      if (error.response.status === 401) {
        commit("setAccessToken");
      }
    },
    login({ dispatch, commit }, creds) {
      const apiEndpoint = `${rpgtoolsApiEndpoint}/api/v1/token`;
      return RpgtoolsApiService.post(
        apiEndpoint,
        { username: creds.username, password: creds.password },
        { crossdomain: true }
      )
        .then(function(response) {
          let access_token = response.data.access;
          commit("setAccessToken", access_token);
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putItem({ dispatch, state }, context) {
      let item = context.item;
      let itemsPath = context.itemsPath;
      let endPoint = "";
      endPoint = item.id
        ? `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/edit/${item.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/`;
      let method = item.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: item,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getItems",
              itemsPath: itemsPath
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    runAction({ commit, dispatch }, context) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/action-runner`;
      return axios({
        url: endPoint,
        method: "post",
        data: context.input,
        headers: { "content-type": "application/json" }
      })
        .then(response => {
          let actionResults = response.data;
          return Promise.resolve(
            commit({
              type: "setActionResults",
              actionResults: actionResults
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    signOut({ commit }) {
      commit("setAccessToken");
    },
    showError({ commit }, error_string) {
      commit("setError", error_string);
    }
  }
});
