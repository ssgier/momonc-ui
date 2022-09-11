<template>
  <p v-if="is_disconnected">Connecting...</p>
  <RunConfig v-else-if="showRunConfig" />
  <ProcessingView v-else-if="showProcessingView" />
  <p v-else>Terminal</p>
</template>

<script>
import RunConfig from "./components/RunConfig.vue";
import ProcessingView from "./components/ProcessingView.vue";
import { store } from "./store.js";
import { handleMessage } from "./service/messageHandlers.js";

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
      return this.sharedState.domainState.Idle;
    },
    showProcessingView() {
      return this.sharedState.domainState === "Processing";
    },
  },
  created() {
    let webSocket = (this.sharedState.commState.webSocket = new WebSocket(
      "ws://127.0.0.1:3000"
    ));
    webSocket.addEventListener("open", () => {
      this.sharedState.commState.state = "connected";
    });
    webSocket.addEventListener("close", () => {
      this.sharedState.commState.state = "disconnected";
    });
    webSocket.addEventListener("message", (event) => {
      handleMessage(this.sharedState, event.data);
    });
  },
  beforeUnmount() {
    this.sharedState.commState.webSocket.close();
  },
};
</script>

<style></style>
