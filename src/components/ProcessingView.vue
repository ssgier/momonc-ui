<template>
  <div>Processing...</div>
  <div><button class="button is-danger" @click="stopRun">Stop</button></div>
  <div>
  <CandidateEvolutionChart />
  </div>
  <div>
    {{ processingStateText }}
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
  computed: {
    processingStateText() {
      return JSON.stringify(this.sharedState.processingState.latestEval);
    },
  },
  methods: {
    stopRun() {
      stopRun(this.sharedState.commState);
    },
  },
};
</script>
