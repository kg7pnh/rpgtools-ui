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
              <template v-for="column in row.columns">
                <b-col
                  v-bind:key="column.id"
                  :id="column.id + '-col'"
                  :sm="column.size"
                >
                  <div class="cell">
                    <label v-if="column.type == 'label'" :id="column.id">{{
                      column.attributes.value
                    }}</label>
                    <b-input
                      v-if="
                        column.type == 'text' ||
                          column.type == 'number' ||
                          column.type == 'email' ||
                          column.type == 'password' ||
                          column.type == 'search' ||
                          column.type == 'url' ||
                          column.type == 'tel' ||
                          column.type == 'date' ||
                          column.type == 'time' ||
                          column.type == 'range' ||
                          column.type == 'color'
                      "
                      :id="column.id"
                      :type="column.type"
                      :placeholder="column.attributes.placeholder"
                      :readonly="column.attributes.readonly"
                      :required="column.attributes.required"
                      trim
                      v-model="generatedData[column.attributes.model]"
                    >
                    </b-input>
                    <b-select
                      v-if="column.type == 'select'"
                      :id="column.id"
                      :options="column.attributes.options"
                      :selected="column.attributes.selected"
                      noWheel="true"
                      v-model="generatedData[column.attributes.model]"
                    >
                    </b-select>
                  </div>
                </b-col>
              </template>
            </b-row>
          </template>
          <hr />
          <!-- <div class="btn-group special" role="group"> -->
          <div class="button-container">
            <b-button
              class="button"
              size="sm"
              variant="outline-primary"
              v-if="step > 1"
              @click.prevent="prev()"
            >
              &lsaquo; Previous
            </b-button>
            <b-button
              class="button"
              size="sm"
              variant="info"
              v-if="item.generator"
              @click.prevent="generateData(item['generator'])"
              >Generate Data
            </b-button>
            <b-button
              class="button"
              size="sm"
              variant="outline-primary"
              v-if="step < stepCount && stepCount > 1"
              @click.prevent="next()"
              >Next &rsaquo;
            </b-button>
            <b-button
              class="button"
              size="sm"
              variant="success"
              v-if="step == stepCount"
              @click.prevent="submit()"
              >Submit
            </b-button>
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
    generatedData: null,
    step: 1,
    stepCount: 1
  }),
  created() {
    this.stepCount = this.schema.steps.length;
    this.generatedData = this.schema.generated_data;
  },
  methods: {
    generateData(action_input) {
      console.log(action_input);
    },
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
    reset() {
      this.$refs.formSchema.form().reset();
    },
    submit() {
      alert("Submit");
    }
  }
};
</script>

<style scoped>
/* .btn-group.special {
  display: flex;
} */
.button {
  margin: 5px;
  text-align: center;
}
.button-container {
  align-items: center;
  justify-content: center;
}
div.cell {
  margin-bottom: 5px;
}
html:not([dir="rtl"]) input[type="number"] {
  text-align: right;
}
input[type="number"] {
  -moz-appearance: textfield;
}
/* input[type="number"]:hover,
input[type="number"]:focus {
  -moz-appearance: number-input;
} */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"]::-webkit-textfield-decoration-container {
  border: 1px #ccc solid;
  background: #efefef;
}
label {
  font-weight: bold;
  vertical-align: middle;
}
</style>
