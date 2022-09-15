const processingStateResetValue = {
  processingStartTime: undefined,
  candidateEvalQueue: undefined,
  timeElapsed: undefined,
};

export function resetProcessingState(sharedState) {
  sharedState.processingState = {
    ...processingStateResetValue,
  };
  sharedState.processingState = {
    processingStartTime: undefined,
    candidateEvalQueue: undefined,
    timeElapsed: undefined,
  };
}

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
      state: "disconnected",
      requestState: "ready",
    },
    domainState: undefined,
    processingState: processingStateResetValue,
  },
};
