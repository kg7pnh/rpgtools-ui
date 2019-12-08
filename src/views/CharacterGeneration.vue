<template>
  <div class="animated fadeIn">
    <b-card id="item-panel">
      <h1>Character Generation</h1>

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
  </div>
</template>

<script>
import Vue from "vue";
import { store } from "../Datastore";
import naturalCompare from "natural-compare";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

export default {
  name: "CharacterGeneration",
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
      showWorflowSelection: false
    };
  },
  mounted() {
    this.$store.dispatch({
      type: "getGames"
    });
    this.$store.dispatch({
      type: "getWorkflows"
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
        console.log(this.selectedGameId);
        for (let i = 0; i < this.games.length; i++) {
          // console.log(this.games[i]);
          if (this.games[i]["value"] == this.selectedGameId) {
            console.log(this.games[i]);
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
