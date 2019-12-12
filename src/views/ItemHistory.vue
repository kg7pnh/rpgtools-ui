<template>
  <div class="animated fadeIn">
    <b-table class="history-table" responsive hover :items="history">
      <template slot="changes" slot-scope="history">
        <b-table :items="history.item.changes">
          <template
            slot="history.item.changes.field"
            slog-scope="history.item.changes"
            >{{ history.item.changes.field }}
          </template>
        </b-table>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "History",
  props: ["history"]
};
</script>
<style>
.history-table {
  max-width: none;
}
</style>
