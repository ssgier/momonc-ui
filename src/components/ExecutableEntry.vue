<template>
  <div class="row">
    <div class="6 col">
      Spec File
      <input class="card w-100" type="text" v-model="this.uiState.specFile" />
    </div>
    <div class="6 col">
      Executable
      <input class="card w-100" type="text" v-model="this.uiState.executable" />
    </div>
  </div>
  <div class="row">
    Args
    <div v-for="(arg, index) in this.uiState.args" :key="index" class="row">
      <div class="col">
        <div class="row">
          <div class="1 col" style="text-align:right">#{{ index + 1 }}</div>
          <div class="12 col">
            <input class="card w-100" type="text" v-model="arg.value" />
          </div>
          <div class="2 col">
            <button class="btn colstretch" @click="removeArg(index)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="row">
        <div class="1 col"></div>
        <div class="12 col">
          <input class="card w-100" type="text" v-model="this.argToAdd" />
        </div>
        <div class="2 col">
          <button
            :disabled="isAddArgDisabled"
            class="btn colstretch"
            @click="addArg"
          >
            Add Arg
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
export default {
  name: "ExecutableEntry",
  data() {
    return {
      uiState: store.state.uiState,
      argToAdd: "",
    };
  },
  computed: {
    isAddArgDisabled() {
      return this.argToAdd === "";
    },
  },
  methods: {
    addArg() {
      this.uiState.addArg(this.argToAdd);
      this.argToAdd = "";
    },
    removeArg(index) {
      this.uiState.removeArg(index);
    },
  },
  components: {},
};
</script>
