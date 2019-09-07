<template>
  <div class="row">
    <div class="single-card">
      <div class="card-headers">
        <span class="card-title">{{ title }}</span>
        <br>
        <span class="card-date">{{ date }}</span>
        <br>
      </div>
      <!-- <div>
        <span>
          {{ link }}
        </span>
        <br>
      </div>-->

      <div class="card-description">
        <span v-for="(content) in content " :key="content">{{ content }}</span>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  name: "homecard",
  props: ["id", "title", "date", "content", "link"],
  methods: {},
  computed: {}
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

.card-date {
  font-weight: 300;
  font-size: 15px;
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
