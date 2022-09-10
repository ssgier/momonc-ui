<template>
  <div class="block">
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Spec File</label>
      </div>

      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model="this.uiState.specFile" />
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Executable</label>
      </div>

      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="this.uiState.executable"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(arg, index) in this.uiState.args"
      :key="index"
      class="field is-horizontal"
    >
      <div class="field-label">
        <label class="label">Arg #{{ index + 1 }}</label>
      </div>
      <div class="field-body">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="text" v-model="arg.value" />
          </p>
          <p class="control button is-danger" @click="removeArg(index)">
            <font-awesome-icon icon="fa fa-remove" inverse />
          </p>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label"></label>
      </div>
      <div class="field-body">
        <div class="field has-addons">
          <p class="control is-expanded">
            <input class="input" type="text" v-model="this.argToAdd" />
          </p>
          <p class="control">
            <button
              :disabled="isAddArgDisabled"
              class="button is-light"
              @click="addArg"
            >
              Add Arg
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { store } from "../store.js";
library.add(faRemove);
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
  components: {
    FontAwesomeIcon,
  },
};
</script>
