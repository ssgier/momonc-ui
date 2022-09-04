<template>
  <div class="run-config">
    <h3>Run Configuration</h3>
    <div class="config-item">
      <label>Program:</label>
      <input value="python" />
    </div>
    <div class="config-item">
      <label>Arg #1:</label>
      <input value="~/git/momonc-service/scripts/obj_func_mock.py" />
    </div>

    <div class="run-button">
      <label></label>
      <button>Run</button>
    </div>
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
h3 {
  margin: 0 0 40px;
  text-align: center;
}

label {
  display: inline-block;
  width: 80px;
  text-align: left;
}

.run-config {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.config-item {
  width: 300px;
  margin: 5px auto;
}

.run-button {
  width: 300px;
  height: 20px;
  margin: 5px auto;
  text-align: left;
}
</style>
