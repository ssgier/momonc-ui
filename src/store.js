export const store = {
  state: {
    frontEndState: {
      specFile: "~/git/momonc-service/scripts/spec.json",
      executable: "python",
      args: [{ value: "~/git/momonc-service/scripts/obj_func_mock.py" }],
      algorithmName: "Parallel Hill Climbing",
      parallelism: 10,
      relativeStdDev: 0.01,
      addArg(argToAdd) {
        this.args.push({ value: argToAdd });
      },
      removeArg(index) {
        this.args.splice(index, 1);
      },
    },
    backEndState: {},
  },
};
