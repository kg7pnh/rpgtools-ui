import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer.vue");
const Home = () => import("@/views/Home.vue");
const CharacterGeneration = () => import("@/views/CharacterGeneration.vue");
const Item = () => import("@/views/Item.vue");
const ItemList = () => import("@/views/ItemList.vue");

function generateProps(route) {
  let name = route["name"];
  let props = {};

  switch (name) {
    case "Books":
      props["name"] = name;
      props["itemsCountState"] = "booksCount";
      props["itemsState"] = "books";
      props["pluralName"] = "Books";
      props["singularName"] = "Book";
      break;
    case "BookDetails":
      props["name"] = name;
      props["itemHistoryState"] = "bookHistory";
      props["itemsStateName"] = "books";
      props["origin"] = "books";
      props["pluralName"] = "Books";
      props["singularName"] = "Book";
      break;
    case "BookFormats":
      props["name"] = name;
      props["itemsCountState"] = "bookFormatsCount";
      props["itemsState"] = "bookFormats";
      props["pluralName"] = "BookFormats";
      props["singularName"] = "BookFormat";
      break;
    case "BookFormatDetails":
      props["name"] = name;
      props["itemHistoryState"] = "bookFormatHistory";
      props["itemsStateName"] = "bookFormats";
      props["origin"] = "bookformats";
      props["pluralName"] = "BookFormats";
      props["singularName"] = "BookFormat";
      break;
    case "Games":
      props["name"] = name;
      props["itemsCountState"] = "gamesCount";
      props["itemsState"] = "games";
      props["pluralName"] = "Games";
      props["singularName"] = "Game";
      break;
    case "GameDetails":
      props["name"] = name;
      props["itemHistoryState"] = "gameHistory";
      props["itemsStateName"] = "games";
      props["origin"] = "games";
      props["pluralName"] = "Games";
      props["singularName"] = "Game";
      break;
    case "GameSystems":
      props["name"] = name;
      props["itemsCountState"] = "gameSystemsCount";
      props["itemsState"] = "gameSystems";
      props["pluralName"] = "GameSystems";
      props["singularName"] = "GameSystem";
      break;
    case "GameSystemDetails":
      props["name"] = name;
      props["itemHistoryState"] = "gameSystemHistory";
      props["itemsStateName"] = "gameSystems";
      props["origin"] = "gamesystems";
      props["pluralName"] = "GameSystems";
      props["singularName"] = "GameSystem";
      break;
    case "Organizations":
      props["name"] = name;
      props["itemsCountState"] = "organizationsCount";
      props["itemsState"] = "organizations";
      props["pluralName"] = "Organizations";
      props["singularName"] = "Organization";
      break;
    case "OrganizationDetails":
      props["name"] = name;
      props["itemHistoryState"] = "organizationHistory";
      props["itemsStateName"] = "organizations";
      props["origin"] = "organizations";
      props["pluralName"] = "Organizations";
      props["singularName"] = "Organization";
      break;
    case "People":
      props["name"] = name;
      props["itemsCountState"] = "peopleCount";
      props["itemsState"] = "people";
      props["pluralName"] = "People";
      props["singularName"] = "Person";
      break;
    case "PersonDetails":
      props["name"] = name;
      props["itemHistoryState"] = "personHistory";
      props["itemsStateName"] = "people";
      props["origin"] = "people";
      props["pluralName"] = "People";
      props["singularName"] = "Person";
      break;
    case "Publishers":
      props["name"] = name;
      props["itemsCountState"] = "publishersCount";
      props["itemsState"] = "publishers";
      props["pluralName"] = "Publishers";
      props["singularName"] = "Publisher";
      break;
    case "PublisherDetails":
      props["name"] = name;
      props["itemHistoryState"] = "publisherHistory";
      props["itemsStateName"] = "publishers";
      props["origin"] = "publishers";
      props["pluralName"] = "Publishers";
      props["singularName"] = "Publisher";
      break;
    case "Schemas":
      props["name"] = name;
      props["itemsCountState"] = "schemasCount";
      props["itemsState"] = "schemas";
      props["pluralName"] = "Schemas";
      props["singularName"] = "Schema";
      break;
    case "SchemaDetails":
      props["name"] = name;
      props["itemHistoryState"] = "schemaHistory";
      props["itemsStateName"] = "schemas";
      props["origin"] = "schemas";
      props["pluralName"] = "Schemas";
      props["singularName"] = "Schema";
      break;
  }
  return props;
}

Vue.use(Router);

let routes = [
  {
    path: "/",
    name: "",
    component: DefaultContainer,
    children: [
      {
        path: "charactergeneration",
        name: "CharacterGeneration",
        component: CharacterGeneration
      },
      {
        path: "books",
        name: "Books",
        props: generateProps,
        component: ItemList
      },
      {
        path: "books/:item_id",
        name: "BookDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "bookformats",
        name: "BookFormats",
        props: generateProps,
        component: ItemList
      },
      {
        path: "bookformats/:item_id",
        name: "BookFormatDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "games",
        name: "Games",
        props: generateProps,
        component: ItemList
      },
      {
        path: "games/:item_id",
        name: "GameDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "gamesystems",
        name: "GameSystems",
        props: generateProps,
        component: ItemList
      },
      {
        path: "gamesystems/:item_id",
        name: "GameSystemDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "home",
        name: "Home",
        component: Home
      },
      {
        path: "organizations",
        name: "Organizations",
        props: generateProps,
        component: ItemList
      },
      {
        path: "organizations/:item_id",
        name: "OrganizationDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "people",
        name: "People",
        props: generateProps,
        component: ItemList
      },
      {
        path: "people/:item_id",
        name: "PersonDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "publishers",
        name: "Publishers",
        props: generateProps,
        component: ItemList
      },
      {
        path: "publishers/:item_id",
        name: "PublisherDetails",
        props: generateProps,
        component: Item
      },
      {
        path: "schemas",
        name: "Schemas",
        props: generateProps,
        component: ItemList
      },
      {
        path: "schemas/:item_id",
        name: "SchemaDetails",
        props: generateProps,
        component: Item
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
