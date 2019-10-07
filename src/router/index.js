import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer.vue");
const Home = () => import("@/views/Home.vue");
const Book = () => import("@/views/Book.vue");
const BooksList = () => import("@/views/BookList.vue");
const BookFormatsList = () => import("@/views/BookFormatsList.vue");
const GamesList = () => import("@/views/GameList.vue");
const GameSystemsList = () => import("@/views/GameSystemsList.vue")
const PeopleList = () => import("@/views/PeopleList.vue");
const OrganizationsList = () => import("@/views/OrganizationList.vue");
const PublishersList = () => import("@/views/PublisherList.vue");
const SchemasList = () => import("@/views/SchemasList.vue");
const GameMasterTools = () => import("@/views/GameMasterTools.vue");
const PlayerTools = () => import("@/views/PlayerTools.vue");
// const Home = () => import("@/views/Home");
// const HomepageContainer = () => import("@/containers/HomePageContainer.vue");

Vue.use(Router);

let routes = [
  {
    path: "/",
    name: "",
    component: DefaultContainer,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home
      },
      {
        path: "publishers",
        name: "Publishers",
        component: PublishersList
      },
      {
        path: "books",
        name: "Books",
        component: BooksList
      },
      {
        path: "books/:page/:book_id",
        name: "Book Details",
        component: Book,
      },
      {
        path: "bookformats",
        name: "BookFormats",
        component: BookFormatsList
      },
      {
        path: "games",
        name: "Games",
        component: GamesList
      },
      {
        path: "gamesystems",
        name: "GameSystems",
        component: GameSystemsList
      },
      {
        path: "people",
        name: "People",
        component: PeopleList
      },
      {
        path: "organizations",
        name: "Organizations",
        component: OrganizationsList
      },
      {
        path: "schemas",
        name: "Schemas",
        component: SchemasList
      },
      {
        path: "game-master-tools",
        name: "GameMasterTools",
        component: GameMasterTools
      },
      {
        path: "player-tools",
        name: "PlayerTools",
        component: PlayerTools
      }
    ]
  }
];

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
});
