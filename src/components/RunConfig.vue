<template>
  <div class="run-config">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered">
            <div class="column is-two-thirds">
              <div class="block">
                <h1 class="title is-4">Run Configuration</h1>
              </div>
              <div class="block">
                <h1 class="subtitle is-6">Objective Function</h1>
              </div>
              <div class="block">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Executable</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <input class="input" type="text" value="python" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="field is-horizontal">
                  <div class="field-label">
                    <label class="label">Arg #1</label>
                  </div>
                  <div class="field-body">
                    <div class="field has-addons">
                      <p class="control is-expanded">
                        <input
                          class="input"
                          type="text"
                          value="~/git/momonc-service/scripts/obj_func_mock.py"
                        />
                      </p>
                      <p class="control button is-danger">
                        <font-awesome-icon icon="fa fa-remove" inverse />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="level">
                <div class="level-left"></div>
                <div class="level-right">
                  <div class="level-item">
                    <button class="button is-light is-small" type="button">
                      Add Arg
                    </button>
                  </div>
                </div>
              </div>
              <div class="is-divider"></div>

              <div class="block">
                <h1 class="subtitle is-6">Optimizer</h1>
              </div>
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
                            <option>Genetic Algorithm</option>
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
                        <input class="input" type="number" value="20" />
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
                        <input class="input" value="0.01" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    </section>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
library.add(faRemove);
export default {
  name: "RunConfig",
  props: {
    msg: String,
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped></style>
