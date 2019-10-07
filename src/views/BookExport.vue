<template>
  <pre>{{ bookStripped }}</pre>
</template>

<script>
import _ from "lodash";

export default {
  name: "BookExport",
  props: ["book"],
  data() {
    return {
      bookStripped: null
    };
  },
  watch: {
    book: function(val) {
      this.bookStripped = _.chain(this.book)
        .omit([
          "_id",
          "id",
          "created",
          "modified"
        ])
        .toPairs()
        .sortBy(0)
        .fromPairs()
        .value();
    }
  }
};
</script>