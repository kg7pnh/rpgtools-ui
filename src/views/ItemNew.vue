<template>
  <div>
    <b-card bg-variant="white">
      <ItemDetail
        :item="item"
        :isItemNew="isItemNew"
        :isItemImported="isItemImported"
      />
    </b-card>
  </div>
</template>

<script>
import ItemDetail from "../views/ItemDetail.vue";

export default {
  name: "ItemNew",
  components: {
      ItemDetail
  },
  props: ["isItemNew", "isItemImported"],
  computed: {
    item: function() {
  
    }
  }
};
</script>
