<template>
  <AppHeaderDropdown right no-caret>
    <template #header>
      <img v-if="user.thumbnailphoto" class="header-user-photo" :src="user.thumbnailphoto">
      <div v-if="!user.thumbnailphoto" class="header-user-initial">
        <div>
          <span>{{ userInitial }}</span>
        </div>
      </div>
    </template>
    <b-dropdown-item slot="dropdown" @click="$emit('signOut')">Sign Out</b-dropdown-item>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from "@coreui/vue";
import { store } from "../Datastore";

export default {
  name: "DefaultHeaderDropdownAccnt",
  components: {
    AppHeaderDropdown
  },
  mounted() {
    this.$on("signOut", bvEvent => {
      store.dispatch("signOut");
    });
  },
  computed: {
    user: function() {
      return store.state.user;
    },
    userInitial: function() {
      return this.user.username
        ? this.user.username.substr(0, 1).toUpperCase()
        : "";
    }
  }
};
</script>
