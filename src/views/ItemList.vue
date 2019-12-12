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
        <span class="add-item-text">Add {{ singularName }}</span>
      </b-button>
      <b-button
        v-if="user.is_superuser"
        class="import-button"
        variant="primary"
        @click="importItem"
      >
        <i class="fa fa-upload"></i>
        <span class="add-item-text">Import {{ singularName }}</span>
      </b-button>
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="items.length"
          per-page="10"
          aria-controls="item-list"
        >
        </b-pagination>
        <b-table
          id="item-list"
          per-page="10"
          :current-page="currentPage"
          :fields="fields"
          hover
          responsive
          :items="items"
        >
          <template slot=" " slot-scope="items">
            <b-button-group size="sm">
              <b-button
                v-b-tooltip.hover.right
                title="View Item"
                href="#"
                variant="outline-primary"
                @click="openItem(items.item.id)"
              >
                <i class="fa fa-info-circle"></i>
              </b-button>
              <b-button
                v-if="user.is_superuser"
                v-b-tooltip.hover.right
                title="Edit Item"
                href="#"
                variant="outline-success"
                @click="openItem(items.item.id)"
              >
                <i class="fa fa-edit"></i>
              </b-button>
              <b-button
                v-if="user.is_superuser"
                v-b-tooltip.hover.right
                title="Delete Item"
                href="#"
                variant="outline-danger"
                @click="deleteItemConfirmation(items.item)"
              >
                <i class="fa fa-trash"></i>
              </b-button>
            </b-button-group>
          </template>
          <template slot="name" slot-scope="items">{{
            items.item.name
          }}</template>
          <template slot="description" slot-scope="items">{{
            items.item.description
          }}</template>
        </b-table>
      </div>
    </b-card>

    <!-- Delete Confirmation Modal -->
    <b-modal
      id="delete-confirmation-modal"
      no-close-on-backdrop
      header-bg-variant="danger"
      hide-backdrop
      scrollable
      v-model="showDeleteConfirmationModal"
      :title="deleteModalTitle"
    >
      <div class="d-block text-center">
        <p>
          Are you sure you want to delete the {{ this.singularName }} named "{{
            this.selectedItem.name
          }}"?
        </p>
        <p>This action can not be undone!</p>
      </div>

      <div slot="modal-footer">
        <b-button-group size="sm">
          <b-button
            ref="cancel-item-button"
            variant="secondary"
            @click="cancelDeleteItem"
            class="float-left"
            >Cancel
          </b-button>
          <b-button
            ref="delete-item-button"
            variant="danger"
            @click="deleteItem(items.item)"
            class="float-right"
            >Delete
          </b-button>
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { store } from "../Datastore";
import router from "../router/index";

export default {
  props: {
    name: {
      type: String
    },
    itemsState: {
      type: String
    },
    pluralName: {
      type: String
    },
    singularName: {
      type: String
    }
  },
  computed: {
    items: function() {
      return this.$store.state[this.itemsState];
    },
    user: function() {
      return store.state.user;
    }
  },
  data() {
    return {
      currentPage: 1,
      deleteModalTitle: "",
      fields: [
        " ",
        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "description",
          label: "Description",
          sortable: false
        }
      ],
      selectedItem: {},
      selectedPublisher: null,
      showDeleteConfirmationModal: false
    };
  },
  mounted() {
    this.$store.dispatch({
      type: "getItems",
      itemsPath: this.itemsState
    });
    this.updateInterval = setInterval(() => {
      this.$store.dispatch({
        type: "getItems",
        itemsPath: this.itemsState
      });
    }, 300000);
  },
  methods: {
    addItem: function() {
      this.$store.state[this.itemsState] = [];
      router.push(`/${this.itemsState}/new`);
    },
    cancelDeleteItem() {
      this.$store.dispatch({
        type: "getItems",
        itemsPath: this.itemsState
      });
      this.showDeleteConfirmationModal = false;
    },
    deleteItem() {
      this.$store.dispatch({
        type: "deleteItem",
        itemsPath: this.itemsState,
        itemId: this.selectedItem.id
        // type: "delete" + this.singularName,
        // item: this.selectedItem
      });
      this.showDeleteConfirmationModal = false;
      this.selectedItem = {};
      this.$store.state[this.itemsState] = [];
      router.push(`/${this.itemsState}`);
    },
    deleteItemConfirmation(item) {
      this.selectedItem = item;
      this.deleteModalTitle = "Delete " + this.selectedItem.name + "?";
      this.showDeleteConfirmationModal = true;
    },
    openItem(id) {
      router.push(`/${this.itemsState}/${id}`);
    },
    importItem: function() {
      alert("importItem");
    }
  }
};
</script>
