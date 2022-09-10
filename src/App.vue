<template>
  <RunConfig />
</template>

<script>
import RunConfig from "./components/RunConfig.vue";
import { store } from "./store.js";
import { handleMessage } from "./service/messageHandlers.js";

export default {
  name: "App",
  components: {
    RunConfig,
  },
  data() {
    return {
      sharedState: store.state,
    };
  },
  created() {
    this.sharedState.commState.webSocket = new WebSocket(
      "ws://127.0.0.1:3000"
    );
    this.sharedState.commState.webSocket.addEventListener(
      "message",
      (event) => {
        handleMessage(this.sharedState, event.data);
      }
    );
  },
  beforeUnmount() {
    this.sharedState.commState.webSocket.close();
  },
};
</script>

<style></style>
