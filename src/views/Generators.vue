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

      <div v-if="!selectedGameId">Select game to view available Generators</div>
      <div v-if="!showWorflowSelection && !!selectedGameId">
        No Generators available for
        <span class="font-weight-bold">{{ selectedGameName }}</span>
      </div>
      <b-form-group v-else-if="showWorflowSelection">
        <label for="workflow-select">Select Generator</label>
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
    <dynamic-form
      v-if="showWorkflowForm"
      :schema="schema"
      :key="schemaState"
    ></dynamic-form>
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
      showWorkflowForm: false,
      showWorflowSelection: false,
      schema: null,
      schemaState: 0
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
      this.showWorkflowForm = false;
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
      this.schema = {};
      this.gameWorkflow = null;
      if (this.seletedWorkflowId) {
        for (let i = 0; i < this.workflows.length; i++) {
          if (this.workflows[i]["_id"] == this.seletedWorkflowId) {
            this.gameWorkflow = this.workflows[i];
            this.schema = this.workflows[i].definition;
            this.schemaState += 1;
            this.showWorkflowForm = true;
          }
        }
      }
    }
  }
};
</script>
