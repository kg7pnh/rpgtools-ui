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
    access_token: localStorage.getItem("access_token"),
    user: {},
    bookFormats: [],
    bookFormatHistory: [],
    books: [],
    bookHistory: [],
    contributors: [],
    games: [],
    gameHistory: [],
    gameSystems: [],
    gameSystemHistory: [],
    people: [],
    personHistory: [],
    organizations: [],
    organizationHisotry: [],
    publishers: [],
    publisherHistory: [],
    schemas: [],
    schemaHistory: [],
    workflows: [],
    workflowHistory: [],
    error: "",
    booksCount: 0,
    bookFormatsCount: 0,
    contributorsCount: 0,
    gamesCount: 0,
    gameSystemsCount: 0,
    importedBook: [],
    organizationsCount: 0,
    peopleCount: 0,
    publishersCount: 0,
    schemasCount: 0,
    workflowsCount: 0
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
    deleteBook({ dispatch, state }, context) {
      let book = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/books/delete/${book.id}`;
      let method = "delete";
      return axios({
        method: method,
        url: endPoint,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getBooks"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    deleteBookFormat({ dispatch, state }, context) {
      let bookFormat = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/bookformats/delete/${
        bookFormat.id
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
              type: "getBookFormats"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    deleteGame({ dispatch, state }, context) {
      let game = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/games/delete/${game.id}`;
      let method = "delete";
      return axios({
        method: method,
        url: endPoint,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getGames"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    deleteGameSystem({ dispatch, state }, context) {
      let gameSystem = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/gamesystems/delete/${
        gameSystem.id
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
              type: "getGameSystems"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    deleteOrganization({ dispatch, state }, context) {
      let organization = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/organizations/delete/${
        organization.id
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
              type: "getOrganizations"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    deletePerson({ dispatch, state }, context) {
      let person = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/persons/delete/${
        person.id
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
              type: "getPeople"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    deletePublisher({ dispatch, state }, context) {
      let publisher = context.item;
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/publishers/delete/${
        publisher.id
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
              type: "getPublishers"
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
          console.log(response);
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
          console.log(response);
          return Promise.resolve(
            commit("setBookFormatHistory", bookFormatHistory)
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getBooks({ commit, state, dispatch }) {
      if (state.access_token) {
        let endPoint = `${rpgtoolsApiEndpoint}/api/v1/books`;
        let header = {
          headers: { Authorization: "Bearer " + state.access_token }
        };
        return axios
          .get(endPoint, header)
          .then(response => {
            let books = response.data;
            return Promise.resolve(commit("setBooks", books));
          })
          .catch(error => {
            return Promise.resolve(dispatch("handleRequestError", error));
          });
      }
    },
    getContributors({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/contributors`;
      return axios
        .get(endPoint)
        .then(response => {
          let contributors = response.data;
          return Promise.resolve(commit("setContributors", contributors));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getGames({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/games`;
      return axios
        .get(endPoint)
        .then(response => {
          let games = response.data;
          return Promise.resolve(commit("setGames", games));
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
          console.log(response);
          console.log(gameHistory);
          return Promise.resolve(commit("setGameHistory", gameHistory));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getGameSystems({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/gamesystems`;
      return axios
        .get(endPoint)
        .then(response => {
          let gameSystems = response.data;
          return Promise.resolve(commit("setGameSystems", gameSystems));
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
          console.log(response);
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
    getOrganizations({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/organizations`;
      return axios
        .get(endPoint)
        .then(response => {
          let organizations = response.data;
          return Promise.resolve(commit("setOrganizations", organizations));
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
    getPeople({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/persons`;
      return axios
        .get(endPoint)
        .then(response => {
          let people = response.data;
          return Promise.resolve(commit("setPeople", people));
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
          console.log(response);
          return Promise.resolve(commit("setPersonHistory", peronsHistory));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getPublishers({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/publishers`;
      return axios
        .get(endPoint)
        .then(response => {
          let publishers = response.data;
          return Promise.resolve(commit("setPublishers", publishers));
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
          console.log(response);
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
          console.log(response);
          return Promise.resolve(commit("setSchemaHistory", schemaHistory));
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getSchemas({ commit, dispatch }) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/schemas`;
      return axios
        .get(endPoint)
        .then(response => {
          let schemas = response.data;
          return Promise.resolve(commit("setSchemas", schemas));
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
    putBook({ dispatch, state }, context) {
      let book = context.item;
      let endPoint = book.id
        ? `${rpgtoolsApiEndpoint}/api/v1/books/edit/${book.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/books/`;
      let method = book.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: book,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getBooks"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putBookFormat({ dispatch, state }, context) {
      let bookFormat = context.item;
      let endPoint = bookFormat.id
        ? `${rpgtoolsApiEndpoint}/api/v1/bookformats/edit/${bookFormat.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/bookformats/`;
      let method = bookFormat.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: bookFormat,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getBookFormats"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putGame({ dispatch, state }, context) {
      let game = context.item;
      let endPoint = game.id
        ? `${rpgtoolsApiEndpoint}/api/v1/games/edit/${game.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/games/`;
      let method = game.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: game,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getGames"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putGameSystem({ dispatch, state }, context) {
      let gameSystem = context.item;
      let endPoint = gameSystem.id
        ? `${rpgtoolsApiEndpoint}/api/v1/gamesystems/edit/${gameSystem.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/gamesystems/`;
      let method = gameSystem.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: gameSystem,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getGameSystems"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putOrganization({ dispatch, state }, context) {
      let organization = context.item;
      let endPoint = organization.id
        ? `${rpgtoolsApiEndpoint}/api/v1/organizations/edit/${organization.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/organizations/`;
      let method = organization.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: organization,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getOrganizations"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putPerson({ dispatch, state }, context) {
      let person = context.item;
      let endPoint = person.id
        ? `${rpgtoolsApiEndpoint}/api/v1/persons/edit/${person.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/persons/`;
      let method = person.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: person,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getPeople"
            })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putPublisher({ dispatch, state }, context) {
      let publisher = context.item;
      let endPoint = publisher.id
        ? `${rpgtoolsApiEndpoint}/api/v1/publishers/edit/${publisher.id}`
        : `${rpgtoolsApiEndpoint}/api/v1/publishers/`;
      let method = publisher.id ? "put" : "post";
      return axios({
        method: method,
        url: endPoint,
        data: publisher,
        headers: { Authorization: "Bearer " + state.access_token }
      })
        .then(() => {
          return Promise.resolve(
            dispatch({
              type: "getPublishers"
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
