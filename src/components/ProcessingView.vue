<template>
  <div>Processing...</div>
  <button class="button is-danger" @click="stopRun">Stop</button>
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
  methods: {
    stopRun() {
      stopRun(this.sharedState.commState);
    },
  },
};
</script>
