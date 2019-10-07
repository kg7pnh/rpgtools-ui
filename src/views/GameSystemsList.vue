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
        <label for="input-none">Short Name</label>
        <b-input-group size="sm">
          <b-form-input
            ref="item_shortname_input"
            v-model="selectedItem.short_name"
            placeholder
            type="text"
          ></b-form-input>
        </b-input-group>
      </div>
      
      <div class="form_input">
        <label for="input-none">Abbreviation</label>
        <b-input-group size="sm">
          <b-form-input
            ref="item_abbreviation_input"
            v-model="selectedItem.abbreviation"
            placeholder
            type="text"
          ></b-form-input>
        </b-input-group>
      </div>

      <div class="form_input">
        <label for="input-none">Publisher</label>
        <b-input-group size="sm">
          <b-form-select id="item-publisher" v-model="selectedPublisher" :options="publishers"></b-form-select>
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
            rows="8"
            size="sm"
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
          ref="putitem-button"
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
import naturalCompare from "natural-compare";

let marked = require("marked");

export default {
  name: "GameSystems",
  computed: {
    items: function() {
      return store.state.gameSystems;
    },
    itemCount: function() {
      return store.state.gameSystemsCount
    },
    publishers: function() {
      return store.state.publishers
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
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
      sigurlarName: "gamesystem",
      singularNameCapitalized: "GameSystem",
      pluralName: "gamesystems",
      pluralNameCapitalized: "GameSystems",
      addModalTitle: "Add Game System",
      editModalTitle: "Edit Game System",
      markdownInput: "",
      itemValid: false,
      currentPage: 1,
      selectedItem: {},
      selectedPublisher: null,
      showModal: false,
      fields: [
        " ",
        {
          key: "name",
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
    store.dispatch("getPublishers");
    this.updateInterval = setInterval(() =>{
      this.$store.dispatch({
        type: "get"+this.pluralNameCapitalized,
        page: this.currentPage
      });
    }, 300000);
  },
  methods: {
    getPage(page) {
      console.log(page);
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
      this.selectedItem = {};
      this.selectedPublisher = null;
      this.showModal = true;
    },
    putItem() {
      this.selectedItem.publisher = this.selectedPublisher;
      this.$store.dispatch({
        type: "put"+this.singularNameCapitalized, 
        item: this.selectedItem,
        page: this.currentPage
      });
      this.showModal = false;
    },
    editItem(item) {
      this.selectedItem = item;
      this.selectedPublisher = item.publisher;
      this.markdownInput = item.read_me;
      this.showModal = true;
    },
    updateMarkdown: _.debounce(function (e) {
      this.markdownInput = e
    }, 300)
  }
};
</script>
