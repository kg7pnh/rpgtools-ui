<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img
          class="navbar-brand-full"
          src="img/dice-d20-solid.svg"
          width="15"
          height="15"
          alt="RPG Tools Logo"
        />
        <img
          class="navbar-brand-minimized"
          src="img/dice-d20-solid.svg"
          width="15"
          height="15"
          alt="RPG Tools Logo"
        />
        <span class="rpgtools_logo">RPG Tools</span>
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" />
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none"></b-nav-item>
        <DefaultHeaderDropdownAccnt />
        <login />
      </b-navbar-nav>
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader />
        <SidebarForm />
        <SidebarNav :navItems="navItems"></SidebarNav>
        <SidebarFooter />
        <SidebarMinimizer />
      </AppSidebar>
      <main class="main">
        <!-- <Breadcrumb :list="breadcrumbs"/> -->
        <b-container fluid>
          <router-view></router-view>
        </b-container>
      </main>
    </div>
    <!-- <TheFooter>
      <div class="ml-auto">
        <span class="mr-1">
          <a href="/#/support">Contact Us</a>
        </span>
      </div>
    </TheFooter> -->
  </div>
</template>

<script>
import nav from "@/Navigation";

import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Footer as TheFooter,
  Breadcrumb
} from "@coreui/vue";

import DefaultHeaderDropdownAccnt from "./DefaultHeaderDropdownAccnt";

export default {
  name: "DefaultContainer",
  components: {
    AppHeader,
    AppSidebar,
    TheFooter,
    Breadcrumb,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  computed: {
    breadcrumbs() {
      return this.$route.matched.filter(
        route =>
          route.name != "DefaultContainer" && (route.name || route.meta.label)
      );
    },
    navItems() {
      return nav.items.filter(d => {
        return d.adminOnly ? store.state.user.is_superuser : true;
      });
    }
  },
  data() {
    return {
      user: store.state.user
    };
  },
  mounted() {
    let suscribe = store.subscribe((mutation, state) => {
      if (mutation.type === "setError") {
        this.$toastr.Add({
          msg: mutation.payload,
          preventDuplicates: true,
          type: "error"
        });
      }
    });
  }
};
</script>
