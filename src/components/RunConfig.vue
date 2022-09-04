<template>
  <div class="run-config">
    <section class="section">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="block">
            <h1 class="title is-4">Run Configuration</h1>
          </div>
          <div class="block">
            <h1 class="subtitle is-6">Objective Function Executable</h1>
          </div>
          <div class="block">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Program</label>
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
                <div class="field is-expanded">
                  <div class="field has-addons">
                    <p class="control is-expanded">
                      <input
                        class="input"
                        type="tel"
                        placeholder="Your phone number"
                        value="~/git/momonc-service/scripts/obj_func_mock.py"
                      />
                    </p>
                    <p class="control">
                      <a class="button is-static"> + </a>
                    </p>
                  </div>
                </div>
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
          <div class="block">
            <button class="button is-dark" type="button">Run</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RunConfig",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
</style>
