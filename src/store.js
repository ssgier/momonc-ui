export const store = {
  state: {
    uiState: {
      specFile: undefined,
      executable: undefined,
      args: [],
      algorithmName: undefined,
      parallelism: undefined,
      relativeStdDev: undefined,
      addArg(argToAdd) {
        this.args.push({ value: argToAdd });
      },
      removeArg(index) {
        this.args.splice(index, 1);
      },
    },
    commState: {
      webSocket: undefined,
    },
    domainState: {},
  },
};
