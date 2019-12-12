import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer.vue");
const Home = () => import("@/views/Home.vue");
const CharacterGeneration = () => import("@/views/CharacterGeneration.vue");
const Item = () => import("@/views/Item.vue");
const ItemDetail = () => import("@/views/ItemDetail.vue");
const ItemExport = () => import("@/views/ItemExport.vue");
const ItemHistory = () => import("@/views/ItemHistory.vue");
const ItemList = () => import("@/views/ItemList.vue");

function generateProps(route) {
  let name = route["name"];
  let path = route["path"];
  let itemId = path.split("/")[2];

  let props = {};

  switch (name) {
    case "Books":
      props["name"] = name;
      props["itemState"] = "book";
      props["itemsState"] = "books";
      props["pluralName"] = "Books";
      props["singularName"] = "Book";
      break;
    case "BookDetails":
      props["name"] = name;
      props["itemHistoryState"] = "bookHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "books";
      props["pluralName"] = "Books";
      props["singularName"] = "Book";
      break;
    case "BookFormats":
      props["name"] = name;
      props["itemsState"] = "bookformats";
      props["pluralName"] = "BookFormats";
      props["singularName"] = "BookFormat";
      break;
    case "BookFormatDetails":
      props["name"] = name;
      props["itemHistoryState"] = "bookFormatHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "bookformats";
      props["pluralName"] = "BookFormats";
      props["singularName"] = "BookFormat";
      break;
    case "Games":
      props["name"] = name;
      props["itemsState"] = "games";
      props["pluralName"] = "Games";
      props["singularName"] = "Game";
      break;
    case "GameDetails":
      props["name"] = name;
      props["itemHistoryState"] = "gameHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "games";
      props["pluralName"] = "Games";
      props["singularName"] = "Game";
      break;
    case "GameSystems":
      props["name"] = name;
      props["itemsState"] = "gamesystems";
      props["pluralName"] = "GameSystems";
      props["singularName"] = "GameSystem";
      break;
    case "GameSystemDetails":
      props["name"] = name;
      props["itemHistoryState"] = "gameSystemHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "gamesystems";
      props["pluralName"] = "GameSystems";
      props["singularName"] = "GameSystem";
      break;
    case "Organizations":
      props["name"] = name;
      props["itemsState"] = "organizations";
      props["pluralName"] = "Organizations";
      props["singularName"] = "Organization";
      break;
    case "OrganizationDetails":
      props["name"] = name;
      props["itemHistoryState"] = "organizationHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "organizations";
      props["pluralName"] = "Organizations";
      props["singularName"] = "Organization";
      break;
    case "People":
      props["name"] = name;
      props["itemsState"] = "persons";
      props["pluralName"] = "People";
      props["singularName"] = "Person";
      break;
    case "PersonDetails":
      props["name"] = name;
      props["itemHistoryState"] = "personHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "persons";
      props["pluralName"] = "People";
      props["singularName"] = "Person";
      break;
    case "Publishers":
      props["name"] = name;
      props["itemsState"] = "publishers";
      props["pluralName"] = "Publishers";
      props["singularName"] = "Publisher";
      break;
    case "PublisherDetails":
      props["name"] = name;
      props["itemHistoryState"] = "publisherHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "publishers";
      props["pluralName"] = "Publishers";
      props["singularName"] = "Publisher";
      break;
    case "Schemas":
      props["name"] = name;
      props["itemsState"] = "schemas";
      props["pluralName"] = "Schemas";
      props["singularName"] = "Schema";
      break;
    case "SchemaDetails":
      props["name"] = name;
      props["itemHistoryState"] = "schemaHistory";
      props["itemId"] = itemId;
      props["itemsState"] = "schemas";
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
        component: Item,
        children: [
          {
            path: "details",
            name: "BookDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "BookExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "BookHistory",
            component: ItemHistory
          }
        ]
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
        component: Item,
        children: [
          {
            path: "details",
            name: "BookFormatDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "BookFormatExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "BookFormatHistory",
            component: ItemHistory
          }
        ]
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
        component: Item,
        children: [
          {
            path: "details",
            name: "GameDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "GameExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "GameHistory",
            component: ItemHistory
          }
        ]
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
        component: Item,
        children: [
          {
            path: "details",
            name: "GameSystemDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "GameSystemExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "GameSystemHistory",
            component: ItemHistory
          }
        ]
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
        component: Item,
        children: [
          {
            path: "details",
            name: "OrganizationDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "OrganizationExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "OrganizationHistory",
            component: ItemHistory
          }
        ]
      },
      {
        path: "persons",
        name: "People",
        props: generateProps,
        component: ItemList
      },
      {
        path: "persons/:item_id",
        name: "PersonDetails",
        props: generateProps,
        component: Item,
        children: [
          {
            path: "details",
            name: "PersonDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "PersonExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "PersonHistory",
            component: ItemHistory
          }
        ]
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
        component: Item,
        children: [
          {
            path: "details",
            name: "PublisherDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "PublisherExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "PublisherHistory",
            component: ItemHistory
          }
        ]
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
        component: Item,
        children: [
          {
            path: "details",
            name: "SchemaDetail",
            component: ItemDetail
          },
          {
            path: "details",
            name: "SchemaExport",
            component: ItemExport
          },
          {
            path: "details",
            name: "SchemaHistory",
            component: ItemHistory
          }
        ]
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
