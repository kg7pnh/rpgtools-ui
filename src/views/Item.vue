<template>
  <div class="animated fadeIn">
    <b-card bg-variant="white">
      <b-tabs v-if="item_id">
        <b-tab :title="this.singularName" active>
          <ItemDetail
            :item_id="item_id"
            :item="item"
            :isItemNew="isItemNew"
            :isItemImported="isItemImported"
            :itemsState="itemsState"
            :pluralName="pluralName"
            :singularName="singularName"
          />
        </b-tab>
        <b-tab v-if="user.is_superuser" title="Export">
          <ItemExport :item="item" />
        </b-tab>
        <b-tab v-if="user.is_superuser" title="History">
          <ItemHistory :history="history" />
        </b-tab>
      </b-tabs>
      <ItemDetail
        v-if="!item_id"
        :item="item"
        :item_id="item_id"
        :isItemNew="isItemNew"
        :isItemImported="isItemImported"
        :itemsState="itemsState"
        :pluralName="pluralName"
        :singularName="singularName"
      />
    </b-card>
  </div>
</template>

<script>
import { store } from "../Datastore";
import ItemDetail from "../views/ItemDetail";
import ItemExport from "../views/ItemExport";
import ItemHistory from "../views/ItemHistory";
import router from "../router/index";
import _ from "lodash";

export default {
  components: {
    ItemDetail,
    ItemExport,
    ItemHistory
  },
  data() {
    return {
      item: null,
      item_id: null,
      isItemNew: false,
      isItemImported: false
    };
  },
  computed: {
    history: function() {
      let changes = [];
      let data = _.sortBy(
        store.state[this.itemHistoryState],
        "history_id",
        "desc"
      );
      for (let i = 0; i < data.length; i++) {
        let child = data[i];
        for (let j = 0; j < child.length; j++) {
          let changeEntry = child[j];
          let change = {};
          change["index"] = j;
          change["type"] = changeEntry["type"];
          change["changes"] = changeEntry["changes"];
          changes.push(change);
        }
      }
      return changes;
    },
    user: function() {
      return store.state.user;
    }
  },
  created: function() {
    store.dispatch({
      type: "getItems",
      itemsPath: "books"
    });
    store.dispatch({
      type: "getItems",
      itemsPath: "bookformats"
    });
    store.dispatch({
      type: "getItems",
      itemsPath: "contributors"
    });
    store.dispatch({
      type: "getItems",
      itemsPath: "games"
    });
    store.dispatch({
      type: "getItems",
      itemsPath: "publishers"
    });

    let item_id_param = this.$route.params.item_id;
    switch (item_id_param) {
      case "new":
        this.isItemNew = true;
        break;
      case "import":
        this.isItemImported = true;
        break;
      default:
        this.item_id = item_id_param;
        store
          .dispatch({
            type: "get" + this.pluralName
          })
          .then(() => {
            this.item = store.state[this.itemsState].find(d => {
              return d.id === this.item_id;
            });
            if (!this.item) {
              store.dispatch(
                "showError",
                `${this.singularName} with id '${this.item_id}' not found.`
              );
              router.push(`/${this.itemsState}`);
            } else {
              store.dispatch({
                type: "get" + this.singularName + "History",
                itemId: item_id_param
              });
            }
          });
    }
  },
  props: {
    name: {
      type: String
    },
    itemHistoryState: {
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
  }
};
</script>
