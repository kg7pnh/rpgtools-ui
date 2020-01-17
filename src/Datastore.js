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
    people: [], // TODO: replace with persons: []

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

    // Schema state
    schema: {},
    schemaHistory: [],
    schemas: [],

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
    setItems(state, context) {
      let itemsType = context.itemsType;
      let data = context.data;
      state[itemsType] = data;
    },
    setItemHistory(state, context) {
      let itemHistoryState = context.itemHistoryState;
      let itmeHistory = context.itmeHistory;
      state[itemHistoryState] = itmeHistory;
    },
    setBooks(state, books) {
      state.books = books;
    },
    setBookHistory(state, bookHistory) {
      state.bookHistory = bookHistory;
    },
    setBookFormats(state, bookFormats) {
      state.bookFormats = bookFormats;
    },
    setBookFormatHistory(state, bookFormatHistory) {
      state.bookFormatHistory = bookFormatHistory;
    },
    setContributors(state, contributors) {
      state.contributors = contributors;
    },
    setGames(state, games) {
      state.games = games;
    },
    setGameHistory(state, gameHistory) {
      state.gameHistory = gameHistory;
    },
    setGameSystems(state, gameSystems) {
      state.gameSystems = gameSystems;
    },
    setGameSystemHistory(state, gameSystemHistory) {
      state.gameSystemHistory = gameSystemHistory;
    },
    setPeople(state, people) {
      state.people = people;
    },
    setPersonHistory(state, personHistory) {
      state.personHistory = personHistory;
    },
    setOrganizations(state, organizations) {
      state.organizations = organizations;
    },
    setOrganizationHistory(state, organizationHistory) {
      state.organizationHistory = organizationHistory;
    },
    setPublishers(state, publishers) {
      state.publishers = publishers;
    },
    setPublisherHistory(state, publisherHistory) {
      state.publisherHistory = publisherHistory;
    },
    setSchemas(state, schemas) {
      state.schemas = schemas;
    },
    setSchemaHistory(state, schemaHistory) {
      state.schemaHistory = schemaHistory;
    },
    setWorkflows(state, workflows) {
      state.workflows = workflows;
    }
  },
  actions: {
    deleteItem({ dispatch, state }, context) {
      if (state.access_token) {
        let item = context.item;
        let itemsPath = context.itemsPath;
        let endPoint = "";
        if (itemsPath == "schemas") {
          endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/delete/${
            item.id
          }/${item.version}`;
        } else {
          endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/delete/${
            item.id
          }`;
        }
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
      if (itemsPath == "schemas") {
        endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/${item.id}/${
          item.version
        }/history`;
      } else {
        endPoint = `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/${
          item.id
        }/history`;
      }
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
    getBookHistory({ commit, dispatch }, context) {
      let bookId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/books/${bookId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let bookHistory = response.data;
          return Promise.resolve(commit("setBookHistory", bookHistory));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getBookFormats({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/bookformats`;
      return axios
        .get(endPoint)
        .then(response => {
          let bookFormats = response.data;
          return Promise.resolve(commit("setBookFormats", bookFormats));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getBookFormatHistory({ commit, dispatch }, context) {
      let bookFormatId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/bookformats/${bookFormatId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let bookFormatHistory = response.data;
          return Promise.resolve(
            commit("setBookFormatHistory", bookFormatHistory)
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getGameHistory({ commit, dispatch }, context) {
      let gameId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/games/${gameId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let gameHistory = response.data;
          return Promise.resolve(commit("setGameHistory", gameHistory));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getGameSystemHistory({ commit, dispatch }, context) {
      let gameSystemId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/gamesystems/${gameSystemId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let gameSystemHistory = response.data;
          return Promise.resolve(
            commit("setGameSystemHistory", gameSystemHistory)
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getWorkflows({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/workflows`;
      return axios
        .get(endPoint)
        .then(response => {
          let workflows = response.data;
          return Promise.resolve(commit("setWorkflows", workflows));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getOrganizationHistory({ commit, dispatch }, context) {
      let organizationHsitoryId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/organizations/${organizationHsitoryId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let organizationHistory = response.data;
          return Promise.resolve(
            commit("setOrganizationHistory", organizationHistory)
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getPersonHistory({ commit, dispatch }, context) {
      let personId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/persons/${personId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let peronsHistory = response.data;
          return Promise.resolve(commit("setPersonHistory", peronsHistory));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getPublisherHistory({ commit, dispatch }, context) {
      let publisherId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/publishers/${publisherId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let publisherHistory = response.data;
          return Promise.resolve(
            commit("setPublisherHistory", publisherHistory)
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getSchemaHistory({ commit, dispatch }, context) {
      let schemaId = context.itemId;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/schemas/${schemaId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let schemaHistory = response.data;
          return Promise.resolve(commit("setSchemaHistory", schemaHistory));
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

      if (itemsPath == "schemas") {
        endPoint = item.id
          ? `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/edit/${item.id}/${
              item.version
            }`
          : `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/`;
      } else {
        endPoint = item.id
          ? `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/edit/${item.id}`
          : `${rpgtoolsApiEndpoint}/api/v1/${itemsPath}/`;
      }
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
    signOut({ commit }) {
      commit("setAccessToken");
    },
    showError({ commit }, error_string) {
      commit("setError", error_string);
    }
  }
});
