<template>
  <div class="containerwide">
    <div class="row">
      <div class="6 col card">
        <CandidateEvolutionChart />
      </div>

      <div class="6 col card">
      <BestSeenTable/>
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
import BestSeenTable from "./BestSeenTable.vue";

export default {
  name: "ProcessingView",
  data() {
    return {
      sharedState: store.state,
    };
  },
  components: {
    CandidateEvolutionChart,
    BestSeenTable
  },
  computed: {},
  methods: {
    stopRun() {
      stopRun(this.sharedState.commState);
    },
  },
};
</script>
