<template>
  <div class="animated fadeIn">
    <b-card id="workflow-selection-panel">
      <h1>Generators</h1>

      <b-form-group>
        <label for="game-select">Select Game</label>
        <b-form-select
          class="game-select"
          id="game-select"
          v-model="selectedGameId"
          :options="games"
        >
        </b-form-select>
      </b-form-group>

      <div v-if="!selectedGameId">Select game to view options</div>
      <div v-if="!showWorflowSelection && !!selectedGameId">
        No options available for
        <span class="font-weight-bold">{{ selectedGameName }}</span>
      </div>

      <b-form-group v-if="showWorflowSelection">
        <label for="workflow-select">Select Option</label>
        <b-form-select
          class="workflow-select"
          text-field="name"
          v-model="seletedWorkflowId"
          value-field="_id"
          :options="gameWorkflows"
        >
        </b-form-select>
      </b-form-group>
    </b-card>
    <dynamic-form v-if="schema" :schema="schema"></dynamic-form>
    <!-- <b-card id="workflow-results-panel">
      <template v-if="schema">
        <h2>{{ schema.title }}</h2>
        <hr />
        <b-container fluid>
          <template v-for="item in schema.steps">
            <div v-show="step === item.id" v-bind:key="item.id">
              <h3 v-if="item.title">{{ item.title }}</h3>
              <template v-for="row in item.rows">
                <b-row v-bind:key="row.id">
                  <template v-for="col in row.cols">
                    <b-col
                      v-bind:key="col.id"
                      :id="col.id + '-col'"
                      :sm="col.size"
                    >
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
      </template>
    </b-card> -->
  </div>
</template>

<script>
import Vue from "vue";
import { store } from "../Datastore";
import naturalCompare from "natural-compare";
import vSelect from "vue-select";
import DynamicForm from "./components/DynamicForm";

Vue.component("v-select", vSelect);
Vue.component("dynamic-form", DynamicForm);

export default {
  name: "Generators",
  computed: {
    games: function() {
      return store.state.games
        .map(d => {
          return { text: d.name, value: d._id };
        })
        .sort((a, b) => naturalCompare(a.name, b.name));
    },
    workflows: function() {
      return store.state.workflows;
    },
    user: function() {
      return store.state.user;
    }
  },
  data() {
    return {
      gameWorkflows: [],
      gameWorkflow: null,
      selectedGame: null,
      selectedGameName: "",
      selectedGameId: "",
      seletedWorkflowId: null,
      showWorflowSelection: false,
      generatedData: null,
      schema: null
    };
  },
  mounted() {
    this.$store.dispatch({
      type: "getItems",
      itemsPath: "games"
    });
    this.$store.dispatch({
      type: "getItems",
      itemsPath: "workflows"
    });
  },
  methods: {},
  watch: {
    selectedGameId: function() {
      this.showWorflowSelection = false;
      this.gameWorkflows = [];
      this.gameWorkflow = null;
      this.seletedWorkflowId = null;
      if (this.selectedGameId) {
        for (let i = 0; i < this.games.length; i++) {
          if (this.games[i]["value"] == this.selectedGameId) {
            this.selectedGameName = this.games[i]["text"];
          }
        }
        for (let i = 0; i < this.workflows.length; i++) {
          if (this.workflows[i]["game"] == this.selectedGameId) {
            this.gameWorkflows.push(this.workflows[i]);
            this.showWorflowSelection = true;
          }
        }
      }
    },
    seletedWorkflowId: function() {
      this.gameWorkflow = null;
      if (this.seletedWorkflowId) {
        for (let i = 0; i < this.workflows.length; i++) {
          if (this.workflows[i]["_id"] == this.seletedWorkflowId) {
            this.gameWorkflow = this.workflows[i];
          }
        }
      }
    }
  }
};
</script>
