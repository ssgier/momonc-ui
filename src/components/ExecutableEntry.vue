<template>
  <div class="block">
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Spec File</label>
      </div>

      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="this.sharedState.frontEndState.specFile"
            />
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
              v-model="this.sharedState.frontEndState.executable"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="(arg, index) in this.sharedState.frontEndState.args"
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
      sharedState: store.state,
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
      this.sharedState.frontEndState.addArg(this.argToAdd);
      this.argToAdd = "";
    },
    removeArg(index) {
      this.sharedState.frontEndState.removeArg(index);
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>
