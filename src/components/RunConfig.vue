<template>
  <div class="run-config">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-thirds">
          <div class="block">
            <h1 class="title is-4">Run Configuration</h1>
          </div>
          <div class="block">
            <h1 class="subtitle is-6">Objective Function</h1>
          </div>
          <ExecutableEntry />
          <div class="is-divider"></div>
          <div class="block">
            <h1 class="subtitle is-6">Optimizer</h1>
          </div>
          <AlgoConfigEntry />
          <div class="level">
            <div class="level-left"></div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-dark" type="button">Run</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlgoConfigEntry from "./AlgoConfigEntry.vue";
import ExecutableEntry from "./ExecutableEntry.vue";
export default {
  name: "RunConfig",
  components: {
    AlgoConfigEntry,
    ExecutableEntry,
  },
};
</script>

<style scoped></style>
