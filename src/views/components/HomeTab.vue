<template>
  <div class="row">
    <a href="http://omf">
      <div class="single-card">
        <div class="card-title">
          <span>{{ title }}</span>
          <br>
        </div>
        <!-- <div>
        <span>
          {{ link }}
        </span>
        <br>
        </div>-->

        <div class="card-description">
          <span v-for="(description) in  description " :key="description">{{ description }}</span>
        </div>
        <br>
      </div>
    </a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "hometab",
  props: ["id", "title", "description", "link"],
  methods: {},
  mounted() {}
};
</script>

<style>
.row {
  background-color: #fff;
}
.card-description {
  bottom: 5px;
}

/* span {
    font-family: Courier;
} */

.card-title {
  font-weight: 600;
  font-size: 30px;
}

.single-card {
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 30px;
  border-radius: 4px;
  box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
</style>