<template>
  <b-card id="workflow-results-panel">
    <h2>{{ definition.title }}</h2>
    <hr />
    <b-container fluid v-if="definition.steps">
      <template v-for="item in definition.steps">
        <div v-bind:key="item.id" v-show="step === item.id">
          <h3 v-if="item.title">{{ item.title }}</h3>
          <template v-for="row in item.rows">
            <b-row v-bind:key="row.id">
              <template v-for="column in row.columns">
                <b-col
                  :id="column.id + '-col'"
                  :sm="column.size"
                  v-bind:key="column.id"
                >
                  <div class="cell">
                    <label :id="column.id" v-if="column.type == 'label'">
                      {{ column.attributes.value }}
                    </label>
                    <h2 :id="column.id" v-if="column.type == 'h2'">
                      {{ column.attributes.value }}
                    </h2>
                    <h3 :id="column.id" v-if="column.type == 'h3'">
                      {{ column.attributes.value }}
                    </h3>
                    <h4 :id="column.id" v-if="column.type == 'h4'">
                      {{ column.attributes.value }}
                    </h4>
                    <span :id="column.id" v-if="column.type == 'span'">{{
                      column.attributes.value
                    }}</span>
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
                    ></b-input>
                    <b-select
                      :id="column.id"
                      :options="column.attributes.options"
                      :selected="column.attributes.selected"
                      @change="executeDynamic(column.attributes.method)"
                      @select="executeDynamic(column.attributes.method)"
                      noWheel="true"
                      v-if="
                        column.type == 'select' &&
                          typeof column.attributes.options == 'object'
                      "
                      v-model="generatedData[column.attributes.model]"
                    ></b-select>
                    <b-select
                      :id="column.id"
                      :options="additionalData[column.attributes.options]"
                      :selected="column.attributes.selected"
                      @change="executeDynamic(column.attributes.method)"
                      @select="executeDynamic(column.attributes.method)"
                      noWheel="true"
                      v-if="
                        column.type == 'select' &&
                          typeof column.attributes.options == 'string'
                      "
                      v-model="generatedData[column.attributes.model]"
                    ></b-select>
                    <b-checkbox
                      :disabled="column.attributes.disabled"
                      :id="column.id"
                      v-if="column.type == 'checkbox'"
                      v-model="generatedData[column.attributes.model]"
                      >{{ column.attributes.label }}</b-checkbox
                    >
                  </div>
                </b-col>
              </template>
            </b-row>
          </template>
          <hr />
          <div class="button-container">
            <b-button
              @click.prevent="prev()"
              class="button"
              size="sm"
              v-if="step > 1"
              variant="outline-primary"
              >&lsaquo; Previous</b-button
            >
            <b-button
              @click.prevent="generateData(item['generator'])"
              class="button"
              size="sm"
              v-if="item.generator"
              variant="info"
              >Generate Data</b-button
            >
            <b-button
              @click.prevent="next()"
              class="button"
              size="sm"
              v-if="step < stepCount && stepCount > 1"
              variant="outline-primary"
              >Next &rsaquo;</b-button
            >
            <b-button
              @click.prevent="reset()"
              class="button"
              size="sm"
              variant="warning"
              >Reset</b-button
            >
            <b-button
              @click.prevent="submit()"
              class="button"
              size="sm"
              v-if="step == stepCount"
              variant="success"
              >Submit</b-button
            >
          </div>
        </div>
      </template>
    </b-container>
    <b-container fluid v-else>
      <template v-for="row in definition.rows">
        <b-row v-bind:key="row.id">
          <template v-for="column in row.columns">
            <b-col
              :id="column.id + '-col'"
              :sm="column.size"
              v-bind:key="column.id"
            >
              <div class="cell">
                <label :id="column.id" v-if="column.type == 'label'">
                  {{ column.attributes.value }}
                </label>
                <h2 :id="column.id" v-if="column.type == 'h2'">
                  {{ column.attributes.value }}
                </h2>
                <h3 :id="column.id" v-if="column.type == 'h3'">
                  {{ column.attributes.value }}
                </h3>
                <h4 :id="column.id" v-if="column.type == 'h4'">
                  {{ column.attributes.value }}
                </h4>
                <span :id="column.id" v-if="column.type == 'span'">{{
                  column.attributes.value
                }}</span>
                <b-input
                  :id="column.id"
                  :placeholder="column.attributes.placeholder"
                  :readonly="column.attributes.readonly"
                  :required="column.attributes.required"
                  :type="column.type"
                  trim
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
                  v-model="generatedData[column.attributes.model]"
                ></b-input>
                <b-select
                  :id="column.id"
                  :selected="column.attributes.selected"
                  @change="executeDynamic(column.attributes.method)"
                  @select="executeDynamic(column.attributes.method)"
                  noWheel="true"
                  options="column.attributes.options"
                  v-if="
                    column.type == 'select' &&
                      typeof column.attributes.options == 'object'
                  "
                  v-model="generatedData[column.attributes.model]"
                ></b-select>
                <b-select
                  :id="column.id"
                  :options="additionalData[column.attributes.options]"
                  :selected="column.attributes.selected"
                  @change="executeDynamic(column.attributes.method)"
                  @select="executeDynamic(column.attributes.method)"
                  noWheel="true"
                  v-if="
                    column.type == 'select' &&
                      typeof column.attributes.options == 'string'
                  "
                  v-model="generatedData[column.attributes.model]"
                ></b-select>
                <b-checkbox
                  :disabled="column.attributes.disabled"
                  :id="column.id"
                  v-if="column.type == 'checkbox'"
                  v-model="generatedData[column.attributes.model]"
                  >{{ column.attributes.label }}</b-checkbox
                >
              </div>
            </b-col>
          </template>
        </b-row>
      </template>
      <hr />
      <div class="button-container">
        <b-button
          :disabled="disableGeneration"
          @click.prevent="generateData(definition['generator'])"
          class="button"
          size="sm"
          v-if="definition.generator"
          variant="info"
          >Generate Data</b-button
        >
        <b-button
          @click.prevent="reset()"
          class="button"
          size="sm"
          variant="warning"
          >Reset</b-button
        >
        <b-button
          :disabled="submitDisabled"
          @click.prevent="submit()"
          class="button"
          size="sm"
          variant="success"
          >Submit</b-button
        >
      </div>
    </b-container>
  </b-card>
</template>

<script>
import axios from 'axios'

export default {
  props: ['definition'],
  data: () => ({
    actionResults: null,
    additionalData: null,
    disableGeneration: true,
    dynamicFunctions: null,
    generatedData: null,
    isGeneratedData: false,
    methodData: null,
    resetData: {},
    step: 1,
    stepCount: 1,
    submitDisabled: true
  }),
  computed: {},
  created() {
    if (this.definition.additional_data) {
      this.additionalData = this.definition.additional_data
    }
    if (this.definition.steps) {
      this.stepCount = this.definition.steps.length
    }
    this.generatedData = this.definition.generated_data
    let key
    for (key in this.generatedData) {
      this.resetData[key] = this.generatedData[key]
    }
    this.dynamicFunctions = this.definition.methods
  },
  methods: {
    executeDynamic(name) {
      if (name) {
        if (this.dynamicFunctions[name]) {
          eval(this.dynamicFunctions[name])
        } else {
          console.warn(`${name} was not yet defined!`)
        }
      }
    },
    generateData(input) {
      input['additional_input'] = this.generatedData
      let headers = {
        'Content-type': 'application/json'
      }
      let endpoint = `${process.env.VUE_APP_RPGTOOLS_API_ENDPOINT}/api/v1/action-runner`
      return axios
        .post(endpoint, input, headers)
        .then(response => {
          this.actionResults = response.data
          let key
          for (key in this.actionResults) {
            this.generatedData[key] = this.actionResults[key]
          }
          this.isGeneratedData = true
        })
        .catch(error => {
          console.log('error: ' + error)
        })
    },
    prev() {
      this.step--
    },
    next() {
      this.step++
    },
    reset() {
      let key
      for (key in this.generatedData) {
        this.generatedData[key] = this.resetData[key]
      }
      this.step = 1
      this.disableGeneration = true
    },
    submit() {
      alert('Submit')
    }
  },
  mounted: function() {}
}
</script>

<style scoped>
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

html:not([dir='rtl']) input[type='number'] {
  text-align: right;
}

input[type='number'] {
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number']::-webkit-textfield-decoration-container {
  border: 1px #ccc solid;
  background: #efefef;
}

label {
  font-weight: bold;
  vertical-align: middle;
}
</style>
