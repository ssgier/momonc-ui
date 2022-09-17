<template>
  <div class="containerwide">
    <div class="row">
      <div class="6 col">
        <CandidateEvolutionChart />
      </div>

      <div class="6 col">
        <table class="w-100">
          <thead>
            <tr>
              <th>Objective Function Value</th>
              <th>Evaluation Time [s]</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn primary" @click="stopRun">Stop</button>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { store } from "../store.js";
import { stopRun } from "../service/serviceCalls.js";
import CandidateEvolutionChart from "./CandidateEvolutionChart.vue";

export default {
  name: "ProcessingView",
  data() {
    return {
      sharedState: store.state,
    };
  },
  components: {
    CandidateEvolutionChart,
  },
  computed: {},
  methods: {
    stopRun() {
      stopRun(this.sharedState.commState);
    },
  },
};
</script>
