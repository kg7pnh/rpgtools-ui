import Vue from "vue";
import Router from "vue-router";

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

const Home = () => import("@/views/Home");
// const HomepageContainer = () => import("@/containers/HomePageContainer.vue");

Vue.use(Router);

let routes = [
    // {
    //     path: "/",
    //     name: "DefaultContainer",
    //     component: DefaultContainer
    // },
    {
        path: "/",
        name: "DefaultContainer",
        component: DefaultContainer,
        // children: [
        //   {
        //     path: "home",
        //     name: "Home",
        //     component: Home
        //   },
        // ]
    }
];

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
});