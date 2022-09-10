export function startRun(commState, uiState) {
  commState.webSocket.send(
    JSON.stringify({
      ProcessingJobDataMsg: {
        program: uiState.executable,
        args: uiState.args.map(x => x.value),
        spec_file: uiState.specFile,
        algo_conf: {
          ParallelHillClimbing: {
            relative_std_dev: Number(uiState.relativeStdDev),
            degree_of_par: Number(uiState.parallelism),
          },
        },
      },
    })
  );
}
