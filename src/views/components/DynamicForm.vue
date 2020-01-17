<template v-if="schema">
  <b-card id="workflow-results-panel">
    <h2>{{ schema.title }}</h2>
    <hr />
    <b-container fluid>
      <template v-for="item in schema.steps">
        <div v-show="step === item.id" v-bind:key="item.id">
          <h3 v-if="item.title">{{ item.title }}</h3>
          <template v-for="row in item.rows">
            <b-row v-bind:key="row.id">
              <template v-for="col in row.cols">
                <b-col v-bind:key="col.id" :id="col.id + '-col'" :sm="col.size">
                  <label v-if="col.type == 'label'" :id="col.id">{{
                    col.attrs.value
                  }}</label>
                  <b-input
                    v-if="
                      col.type == 'text' ||
                        col.type == 'number' ||
                        col.type == 'email' ||
                        col.type == 'password' ||
                        col.type == 'search' ||
                        col.type == 'url' ||
                        col.type == 'tel' ||
                        col.type == 'date' ||
                        col.type == 'time' ||
                        col.type == 'range' ||
                        col.type == 'color'
                    "
                    :id="col.id"
                    :type="col.type"
                    :placeholder="col.attrs.placeholder"
                    :readonly="col.attrs.readonly"
                  >
                  </b-input>
                  <b-select
                    v-if="col.type == 'select'"
                    :id="col.id"
                    :options="col.attrs.options"
                    :selected="col.attrs.selected"
                  >
                  </b-select>
                </b-col>
              </template>
            </b-row>
          </template>
          <hr />
          <div>
            <b-row>
              <b-col lg="*" class="pb-2">
                <b-button variant="outline-primary" @click.prevent="prev()">
                  Previous</b-button
                >
              </b-col>
              <b-col lg="*" class="pb-2">
                <b-button variant="outline-primary" @click.prevent="next()"
                  >Next
                </b-button>
              </b-col>
            </b-row>
          </div>
        </div>
      </template>
    </b-container>
  </b-card>
</template>

<script>
export default {
  props: ["schema"],
  data: () => ({
    step: 1
  }),
  created() {},
  methods: {
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    reset() {
      this.$refs.formSchema.form().reset();
    }
  }
  // props: ["schema", ]
};
</script>
