import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import RpgtoolsApiService from "./RpgtoolsApiService";

const parseLinkHeader = require("parse-link-header");
const rpgtoolsApiEndpoint =
  process.env.VUE_APP_RPGTOOLS_API_ENDPOINT || window.location.origin;
    
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    access_token: localStorage.getItem("access_token"),
    user: {},
    books: [],
    bookHistory: [],
    bookFormats: [],
    contributors: [],
    games: [],
    gameSystems: [],
    people: [],
    organizations: [],
    publishers: [],
    schemas: [],
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
    schemasCount: 0
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
    getCurrentUser: state => state.user,
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
    setBooks(state, { books, links }){
      if (!!links && !!links.last)
      {
        state.booksCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.booksCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.booksCount = books.length;
      }
      state.books = books;
    },
    setBookHistory(state, bookHistory) {
      state.bookHistory = bookHistory;
    },
    setBookFormats(state, { bookFormats, links }){
      if (!!links && !!links.last)
      {
        state.bookFormatsCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.bookFormatsCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.bookFormatsCount = bookFormats.length;
      }
      state.bookFormats = bookFormats;
    },
    setContributors(state, { contributors, links }){
      if (!!links && !!links.last)
      {
        state.contributorsCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.contributorsCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.contributorsCount = books.length;
      }
      state.contributors = contributors;
    },
    setGames(state, { games, links }){
      if (!!links && !!links.last)
      {
        state.gamesCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.gamesCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.gamesCount = games.length;
      }
      state.games = games;
    },
    setGameSystems(state, { gameSystems, links }){
      if (!!links && !!links.last)
      {
        state.gameSystemsCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.gameSystemsCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.gameSystemsCount = gameSystems.length;
      }
      state.gameSystems = gameSystems;
    },
    setPeople(state, { people, links }){
      if (!!links && !!links.last)
      {
        state.peopleCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.peopleCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.peopleCount = people.length;
      }
      state.people = people;
    },
    setOrganizations(state, { organizations, links }){
      if (!!links && !!links.last)
      {
        state.organizationsCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        state.organizationsCount = (parseInt(links.prev.page) +1) *10;
      }
      if (!links) {
        state.organizationsCount = organizations.length;
      }
      state.organizations = organizations;
    },
    setPublishers(state, { publishers, links}){
      if (!!links && !!links.last)
      {
        state.publishersCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        if ( !links.prev.page ) {
          state.publishersCount = 20;
        }
        else {
          state.publishersCount = (parseInt(links.prev.page) +1) *10;
        }
      }
      if (!links) {
        state.publishersCount = items.length;
      }
      state.publishers = publishers;
    },
    setSchemas(state, { schemas, links}){
      if (!!links && !!links.last)
      {
        state.schemasCount = links.last.page * 10;
      }
      if (!!links && !links.last && !!links.prev) {
        if ( !links.prev.page ) {
          state.schemasCount = 20;
        }
        else {
          state.schemasCount = (parseInt(links.prev.page) +1) *10;
        }
      }
      if (!links) {
        state.schemasCount = schemas.length;
      }
      state.schemas = schemas;
    }
  },
  actions: {
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
    signOut({ commit }) {
      commit("setAccessToken");
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
    // Book related
    getBooks({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/books?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let books = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setBooks", { books, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    getBookHistory({ commit, state, dispatch }, bookId) {
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/books/${bookId}/history`;
      return axios
        .get(endPoint)
        .then(response => {
          let bookHistory = response.data;
          return Promise.resolve(
            commit("setBookHistory", bookHistory)
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    // Contributor related
    getContributors({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/contributors?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let contributors = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setContributors", { contributors, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        })
    },
    // BookFormat related
    getBookFormats({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/bookformats?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let bookFormats = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setBookFormats", { bookFormats, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putBookFormat({ dispatch, state }, context) {
      let bookFormat = context.item;
      let page = context.page;
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
        return Promise.resolve(dispatch({
          type: "getBookFormats",
          page: page
        }));
      })
      .catch(error => {
        return Promise.resolve(dispatch("handleRequestError", error));
      });
    },
    // Game related
    getGames({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/games?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let games = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setGames", { games, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putGame({ dispatch, state }, context) {
      let game = context.item;
      let page = context.page;
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
        return Promise.resolve(dispatch({
          type: "getGames",
          page: page
        }));
      })
      .catch(error => {
        return Promise.resolve(dispatch("handleRequestError", error));
      });
    },
    // GameSystems related
    getGameSystems({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/gamesystems?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let gameSystems = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setGameSystems", { gameSystems, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putGameSystem({ dispatch, state }, context) {
      let gameSystem = context.item;
      let page = context.page;
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
        return Promise.resolve(dispatch({
          type: "getGameSystems",
          page: page
        }));
      })
      .catch(error => {
        return Promise.resolve(dispatch("handleRequestError", error));
      });
    },
    // People related
    getPeople({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/persons?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let people = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setPeople", { people, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putPerson({ dispatch, state }, context) {
      let person = context.item;
      let page = context.page;
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
        return Promise.resolve(dispatch({
          type: "getPeople",
          page: page
        }));
      })
      .catch(error => {
        return Promise.resolve(dispatch("handleRequestError", error));
      });
    },
    // Organization related
    getOrganizations({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/organizations?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let organizations = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setOrganizations", { organizations, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    // Publisher related
    getPublishers({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/publishers?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let publishers = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setPublishers", { publishers, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    putPublisher({ dispatch, state }, context) {
      let publisher = context.item;
      let page = context.page;
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
        return Promise.resolve(dispatch({
          type: "getPublishers",
          page: page
        }));
      })
      .catch(error => {
        return Promise.resolve(dispatch("handleRequestError", error));
      });
    },
    // Schema related
    getSchemas({ commit, state, dispatch }, context) {
      let page = 1;
      if ( !!context && !!context.page ) {
        page = context.page;
      }
      let endPoint = `${rpgtoolsApiEndpoint}/api/v1/schemas?page=${page}`;
      return axios
        .get(endPoint)
        .then(response => {
          let schemas = response.data;
          let links = parseLinkHeader(response.headers.link);
          return Promise.resolve(
            commit("setSchemas", { schemas, links })
          );
        })
        .catch(error => {
          return Promise.resolve(dispatch("handleRequestError", error));
        });
    },
    showError({ commit }, error_string) {
      commit("setError", error_string);
    }
  }
});
