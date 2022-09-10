<template>
  <div class="block">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Algorithm</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <div class="select is-fullwidth">
              <select>
                <option>Parallel Hill Climbing</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Parallelism</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="uiState.parallelism"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Relative StdDev</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input"
              v-model="uiState.relativeStdDev"
            />
          </div>
        </div>
      </div>
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
