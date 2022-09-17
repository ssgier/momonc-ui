<template>
<div>
  <p v-if="is_disconnected">Connecting...</p>
  <RunConfig v-else-if="showRunConfig" />
  <ProcessingView v-else-if="showProcessingView" />
  <p v-else>Terminal</p>
</div>
</template>

<script>
import RunConfig from "./components/RunConfig.vue";
import ProcessingView from "./components/ProcessingView.vue";
import { store } from "./store.js";
import { refresh } from "./refresh.js";

export default {
  name: "App",
  components: {
    RunConfig,
    ProcessingView,
  },
  data() {
    return {
      sharedState: store.state,
    };
  },
  computed: {
    is_disconnected() {
      return this.sharedState.commState.state === "disconnected";
    },
    showRunConfig() {
      return this.sharedState.domainState && this.sharedState.domainState.Idle;
    },
    showProcessingView() {
      return (
        this.sharedState.domainState && this.sharedState.domainState.Processing
      );
    },
  },
  created() {
    refresh(this.sharedState);
  },
  beforeUnmount() {
    this.sharedState.commState.webSocket.close();
  },
};
</script>

<style></style>
