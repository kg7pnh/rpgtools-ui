<template>
  <div class="wrapper" id="comp">
    <!-- <div class="animated fadeIn">
      <b-button
        type="button"
        id="signin-button"
        variant="primary"
        @click="signOut"
        class="sign-in-row"
      >{{ signInLabel }}</b-button>
    </div>-->

    <!-- Modal Component -->
    <div>
      <b-modal
        title="Sign in with domain account"
        :visible="isSignedOut"
        no-close-on-backdrop
        no-close-on-esc
        hide-header-close
        id="sign-modal"
      >
        <b-input-group prepend="Username" class="mb-3">
          <b-form-input
            v-model="credentials.username"
            @keypress.enter="signIn"
            placeholder
            type="text"
          ></b-form-input>
        </b-input-group>
        <b-input-group prepend="Password" class="mb-3">
          <b-form-input
            v-model="credentials.password"
            @keypress.enter="signIn"
            placeholder
            type="password"
          ></b-form-input>
        </b-input-group>
        <div slot="modal-footer">
          <b-button id="signin-button" variant="primary" @click="signIn" class="float-right">Sign In</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../../Datastore";
import { mapState, mapStore } from "vuex";

export default {
  name: "login",
  data() {
    return {
      credentials: {
        username: "",
        password: ""
      }
    };
  },
  mounted: function() {
    store.dispatch("getUserInfo");
  },
  computed: {
    signInLabel: function() {
      if (!!store.state.access_token) {
        return "Sign Out";
      }
      return "Sign In";
    },
    user: function() {
      return store.state.user;
    },
    access_token: function() {
      return store.state.access_token;
    },
    isSignedOut: function() {
      return store.getters.isSignedOut;
    }
  },
  watch: {
    access_token: function(val) {
      if (val) {
        store.dispatch("getUserInfo");
      }
    }
  },
  methods: {
    signIn: function(event) {
      event.preventDefault();
      store.dispatch("login", {
        username: this.credentials.username,
        password: this.credentials.password
      });
    },
    signOut: function() {
      store.dispatch("signOut");
    }
  }
};
</script>

<style>
.sign-in-row {
  margin: 1em;
}
.sign-in-label {
  font-size: 25px;
}
.col {
  margin: 2em;
}
</style>