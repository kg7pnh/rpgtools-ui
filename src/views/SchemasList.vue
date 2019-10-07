<template>
  <div class="animated fadeIn">
    <b-card id="item-panel">
      <b-button
        v-if="user.is_superuser"
        class="add-button"
        variant="primary"
        @click="addItem"
      >
        <i class="fa fa-plus"></i>
        <span class="add-item-text">Add {{ singularNameCapitalized }}</span>
      </b-button>
      <b-button
        v-if="user.is_superuser"
        class="add-button"
        variant="primary"
        @click="importItem"
      >
        <i class="fa fa-upload"></i>
        <span class="add-item-text">Import {{ singularNameCapitalized }}</span>
      </b-button>
      <div>
        <b-pagination
          :total-rows="itemCount"
          v-model="currentPage"
          :per-page="10"
          @change="getPage"
        >
        </b-pagination>
        <b-table
          per-page="0"
          current-page="currentPage"
          :fields="fields"
          hover
          responsive
          :items="items"
        >
          <b-link
            slot=" "
            href="#"
            slot-scope="items"
            @click="openItem(items.item)"
          >
            <i v-if="!user.is_superuser" class="fa fa-info-circle"></i>
            <i v-if="user.is_superuser" class="fa fa-edit"></i>
          </b-link>
          <template slot="name" slot-scope="items">{{
            items.item.name
          }}</template>
          <template slot="description" slot-scope="items">{{
            items.item.description
          }}</template>
        </b-table>
      </div>
    </b-card>

  </div>
</template>

<script>
import _ from "lodash";

import { store } from "../Datastore";

let marked = require("marked");

export default {
  name: "Organizations",
  computed: {
    items: function() {
      return store.state.schemas;
    },
    itemCount: function() {
      return store.state.schemasCount;
    },
    user: function() {
      return store.state.user;
    },
    compiledMarkdown: function () {
      if (!this.markdownInput) {
        this.markdownInput = "";
      }
      return marked(this.markdownInput)
    }
  },
  data() {
    return{
      sigurlarName: "schema",
      singularNameCapitalized: "Schema",
      pluralName: "schemas",
      pluralNameCapitalized: "Schemas",
      addModalTitle: "Add Schema",
      editModalTitle: "Edit Schema",
      markdownInput: "",
      itemValid: false,
      currentPage: 1,
      selectedItem: {},
      showModal: false,
      fields: [
        " ",
        {
          key: "name",
          label: "Name",
          sortable: false
        },
        {
          key: "description",
          label: "Description",
          sortable: false
        }
      ]
    };
  },
  mounted() {
    this.$store.dispatch({
      type: "get"+this.pluralNameCapitalized,
      page: this.currentPage
    });
    this.updateInterval = setInterval(() =>{
      this.$store.dispatch({
        type: "get"+this.pluralNameCapitalized,
        page: this.currentPage
      });
    }, 300000);
  },
  methods: {
    getPage(page) {
      this.currentPage = page
      this.$store.dispatch({
        type: "get"+this.pluralNameCapitalized,
        page: this.currentPage
      })
    },
    importItem: function() {
      alert("importItem");
    },
    addItem() {
      alert("addItem");
    },
    putItem() {
      alert("putItem");
    },
    openItem(item) {
      alert(item.name);
    }
  }
};
</script>
