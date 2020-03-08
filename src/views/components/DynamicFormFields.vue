<template v-if="rows">
  <div>
    <template v-for="item in definition.steps">
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
              <h2 v-if="column.type == 'h2'" :id="column.id">
                  {{ column.attributes.value }}
              </h2>
              <h3 v-if="column.type == 'h3'" :id="column.id">
                  {{ column.attributes.value }}
              </h3>
              <h4 v-if="column.type == 'h4'" :id="column.id">
                  {{ column.attributes.value }}
              </h4>
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
                  v-if="
                  column.type == 'select' &&
                      typeof column.attributes.options == 'object'
                  "
                  :id="column.id"
                  :options="column.attributes.options"
                  :selected="column.attributes.selected"
                  noWheel="true"
                  v-model="generatedData[column.attributes.model]"
                  @change="executeDynamic(column.attributes.method)"
              >
              </b-select>
              <b-select
                  v-if="
                  column.type == 'select' &&
                      typeof column.attributes.options == 'string'
                  "
                  :id="column.id"
                  :options="generatedData[column.attributes.options]"
                  :selected="column.attributes.selected"
                  noWheel="true"
                  v-model="generatedData[column.attributes.model]"
                  @change="executeDynamic(column.attributes.method)"
              >
              </b-select>
              <b-checkbox
                  v-if="column.type == 'checkbox'"
                  :disabled="column.attributes.disabled"
                  :id="column.id"
                  v-model="generatedData[column.attributes.model]"
              >
                  {{ column.attributes.label }}
              </b-checkbox>
              </div>
            </b-col>
            </template>
          </b-row>
          </template>
          <hr />
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
            variant="warning"
            @click.prevent="reset()"
            >Reset
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
  </div> 
</template>

<script>
export default {
  props: ["rows"],
}
</script>