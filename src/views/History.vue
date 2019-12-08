<template>
  <div>
    <b-table class="history-table" responsive hover :items="history">
      <template slot="changes" slot-scope="history">
        <b-table :items="history.item.changes">
          <template
            slot="history.item.changes.field"
            slog-scope="history.item.changes"
            >{{ history.item.changes.field }}</template
          >
        </b-table>
      </template>
      <!-- <b-link
                slot=" "
                href="#"
                slot-scope="history"
              >
                <i class="fa fa-info-circle"></i>
              </b-link>
              <template slot="history_user" slot-scope="history">{{
                history.item.history_user
              }}</template>
              <template slot="history_date" slot-scope="history">{{
                history.item.history_date | moment('LLL') 
              }}</template>
              <template slot="name" slot-scope="history">{{
                history.item.name
              }}</template> -->
    </b-table>
  </div>
</template>

<script>
import { store } from "../Datastore";

import JsonViewer from "vue-json-viewer";

export default {
  name: "History",
  components: {
    JsonViewer
  },
  computed: {},
  props: ["history"],
  methods: {
    getChangesJson(data) {
      console.log(data);
      return _.chain(data)
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
    }
  }
};
</script>
<style>
.history-table {
  max-width: none;
}
</style>
