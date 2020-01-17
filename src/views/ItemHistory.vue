<template>
  <div class="animated fadeIn">
    <b-card width="400px">
      <b-table
        class="history-table"
        responsive
        hover
        :fields="fields"
        :items="itemHistory"
        bordered
      >
        <template slot=" " slot-scope="itemHistory">
          <b-button
            v-b-tooltip.hover.right
            title="View Details"
            href="#"
            variant="outline-primary"
            @click="displayHistoryDetails(itemHistory.item)"
          >
            <i class="fa fa-info-circle"></i>
          </b-button>
        </template>
        <template slot="" slot-scope="itemHistory">{{
          itemHistory.item.history_id
        }}</template>
        <template slot="" slot-scope="itemHistory">{{
          itemHistory.item.history_date_time | moment("LLL")
        }}</template>
        <template slot="" slot-scope="itemHistory">{{
          itemHistory.item.history_type
        }}</template>
        <template slot="" slot-scope="itemHistory">{{
          itemHistory.item.change_count
        }}</template>
      </b-table>
    </b-card>

    <!-- Delete Confirmation Modal -->
    <b-modal
      id="history-detail-modal"
      no-close-on-backdrop
      hide-backdrop
      scrollable
      v-model="showHistoryDetailsModal"
      :title="historyDetailsModalTitle"
    >
      <div class="d-block">
        <json-viewer
          :value="historyItemStripped"
          :expand-depth="4"
          copyable
          sort
        ></json-viewer>
      </div>

      <div slot="modal-footer">
        <b-button-group size="sm">
          <b-button
            ref="cancel-item-button"
            variant="secondary"
            @click="closeHistoryDetails"
            class="float-left"
            >Cancel
          </b-button>
        </b-button-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";
import _ from "lodash";

export default {
  name: "ItemHistory",
  props: ["itemHistory"],
  components: {
    JsonViewer
  },
  data() {
    return {
      fields: [
        " ",
        {
          key: "history_id",
          label: "ID"
        },
        {
          key: "history_date_time",
          label: "Datetime"
        },
        {
          key: "history_type",
          label: "Type"
        },
        {
          key: "change_count",
          label: "Count"
        }
      ],
      historyDetailsModalTitle: "",
      historyItemStripped: null,
      showHistoryDetailsModal: false,
      selectedHistoryItem: null
    };
  },
  methods: {
    closeHistoryDetails() {
      this.showHistoryDetailsModal = false;
      this.selectedHistoryItem = {};
      this.historyDetailsModalTitle = "";
      this.historyItemStripped = "";
    },
    displayHistoryDetails(item) {
      this.selectedHistoryItem = item;
      this.historyDetailsModalTitle =
        "Details for History ID " + this.selectedHistoryItem.history_id;
      this.historyItemStripped = _.chain(this.selectedHistoryItem.changes)
        .omit(["_id", "id", "created", "modified"])
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
      this.showHistoryDetailsModal = true;
    }
  }
};
</script>

<style>
.history-table {
  max-width: none;
}
</style>
