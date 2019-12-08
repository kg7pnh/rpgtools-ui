<template>
  <json-viewer
    :value="itemStripped"
    :expand-depth="4"
    copyable
    sort
  ></json-viewer>
</template>

<script>
import _ from "lodash";

import JsonViewer from "vue-json-viewer";

export default {
  name: "Export",
  components: {
    JsonViewer
  },
  props: ["item"],
  computed: {
    itemStripped: function(val) {
      return _.chain(this.item)
        .omit(["_id", "id", "created", "modified"])
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
    }
  }
  // data() {
  //   return {
  //     itemStripped: null
  //   };
  // },
  // watch: {
  //   item: function(val) {
  //     this.itemStripped = _.chain(this.item)
  //       .omit([
  //         "_id",
  //         "id",
  //         "created",
  //         "modified"
  //       ])
  //       .toPairs()
  //       .sortBy(0)
  //       .fromPairs()
  //       .value();
  //   }
  // }
};
</script>
