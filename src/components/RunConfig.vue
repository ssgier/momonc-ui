<template>
    <div class="containernarrow">
      <div class="row">
        <h4>Run Configuration</h4>
        <h5>Objective Function</h5>
        <ExecutableEntry />
        <h5>Optimizer</h5>
        <AlgoConfigEntry />
      </div>
      <div class="row">
        <div class="col">
          <div class="row">
            <button
              class="btn primary"
              :disabled="runButtonDisabled"
              type="button"
              @click="startRun"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import AlgoConfigEntry from "./AlgoConfigEntry.vue";
import ExecutableEntry from "./ExecutableEntry.vue";
import { startRun } from "../service/serviceCalls.js";
import { store } from "../store.js";

export default {
  name: "RunConfig",
  components: {
    AlgoConfigEntry,
    ExecutableEntry,
  },
  data() {
    return {
      uiState: store.state.uiState,
      commState: store.state.commState,
    };
  },
  computed: {
    runButtonDisabled() {
      return this.commState.requestState !== "ready";
    },
  },
  methods: {
    startRun() {
      startRun(this.commState, this.uiState);
      this.commState.requestState = "pending";
    },
  },
};
</script>

<style scoped></style>
