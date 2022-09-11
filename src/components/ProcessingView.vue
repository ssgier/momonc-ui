<template>
  <div>Processing...</div>
  <div><button class="button is-danger" @click="stopRun">Stop</button></div>
  <div>
    {{ processingStateText }}
  </div>
</template>

<script>
import { store } from "../store.js";
import { stopRun } from "../service/serviceCalls.js";

export default {
  name: "ProcessingView",
  data() {
    return {
      sharedState: store.state,
    };
  },
  computed: {
    processingStateText() {
        return JSON.stringify(this.sharedState.processingState.latestEval);
    }
  },
  methods: {
    stopRun() {
      stopRun(this.sharedState.commState);
    },
  },
};
</script>
