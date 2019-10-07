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
            @click="editItem(items.item)"
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

    <!-- Modal Component -->
    <b-modal id="item-model" scrollable v-model="showModal" :title="editModalTitle">

      <div class="form_input">
        <label for="input-none">Name</label>
        <i class="fa fa-asterisk text-danger"></i>
        <b-input-group size="sm">
          <b-form-input
            ref="item_name_input"
            v-model="selectedItem.name"
            placeholder
            type="text"
          ></b-form-input>
        </b-input-group>
      </div>
      
      <div class="form_input">
        <label for="input-none">Description</label>
        <b-input-group size="sm">
          <b-form-input
            ref="item_description_input"
            v-model="selectedItem.description"
            placeholder
            type="text"
          ></b-form-input>
        </b-input-group>
      </div>
      
      <div class="form_input">
        <label for="input-none">Read Me</label>
        <b-input-group size="sm">
          <b-form-textarea
            ref="item_readme_input"
            v-model="selectedItem.read_me"
            placeholder
            type="text"
            @input="updateMarkdown"
          >
          </b-form-textarea>
        </b-input-group>
      </div>
      
      <div class="form_input">
        <label for="input-none">Read Me Preview</label>
        <b-input-group size="sm">
          <div v-html="compiledMarkdown"></div>
        </b-input-group>
      </div>
      
      <div slot="modal-footer">
        <b-button
          ref="additem-button"
          :disabled="!itemValid"
          variant="primary"
          @click="putItem"
          class="float-right"
        >Save
        </b-button>
      </div>
    </b-modal>
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
      return store.state.organizations;
    },
    itemCount: function() {
      return store.state.organizationsCount;
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
      sigurlarName: "organization",
      singularNameCapitalized: "Organization",
      pluralName: "organizations",
      pluralNameCapitalized: "Organizations",
      addModalTitle: "Add Organization",
      editModalTitle: "Edit Organization",
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
    editItem(item) {
      this.selectedItem = item;      
      this.showModal = true;
      this.markdownInput = item.read_me;
    },
    updateMarkdown: _.debounce(function (e) {
      this.markdownInput = e
    }, 300)
  }
};
</script>
