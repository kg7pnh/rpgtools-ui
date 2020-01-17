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
          <ItemHistory :itemHistory="itemHistory" />
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
    itemHistory: function() {
      let entries = _.sortBy(
        store.state[this.itemHistoryState],
        "history_id",
        "desc"
      );
      let index = 0;
      let data = [];
      for (index = 0; index < entries.length; index++) {
        let child_index = 0;
        for (
          child_index = 0;
          child_index < entries[index].length;
          child_index++
        ) {
          let item = {};
          item["history_id"] = entries[index][child_index]["history_id"];
          item["history_date_time"] =
            entries[index][child_index]["history_date_time"];
          item["history_type"] = entries[index][child_index]["history_type"];
          item["change_count"] = entries[index][child_index]["change_count"];
          item["changes"] = entries[index][child_index]["changes"];
          data.push(item);
        }
      }
      return data;
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
      itemsPath: "gamesystems"
    });
    store.dispatch({
      type: "getItems",
      itemsPath: "publishers"
    });
    store.dispatch({
      type: "getItems",
      itemsPath: "schemas"
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
            type: "getItems",
            itemsPath: this.itemsState
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
                type: "getItemHistory",
                item: this.item,
                itemHistoryState: this.itemHistoryState,
                itemsPath: this.itemsState
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
