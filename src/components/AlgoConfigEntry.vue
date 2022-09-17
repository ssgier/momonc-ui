<template>
  <div class="row">
    <div class="4 col">
      Algorithm
      <select class="card w-100">
        <option>Parallel Hill Climbing</option>
      </select>
    </div>
    <div class="4 col">
      Parallelism

      <input class="card w-100" type="number" v-model="uiState.parallelism" />
    </div>
    <div class="4 col">
      Relative StdDev

      <input class="card w-100" v-model="uiState.relativeStdDev" />
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
export default {
  name: "AlgoConfigEntry",
  data() {
    return {
      uiState: store.state.uiState,
    };
  },
};
</script>
