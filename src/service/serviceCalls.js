export function startRun(commState, uiState) {
  commState.webSocket.send(
    JSON.stringify({
      StartProcessing: {
        program: uiState.executable,
        args: uiState.args.map((x) => x.value),
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

export function stopRun(commState) {
  commState.webSocket.send(JSON.stringify("StopProcessing"));
}
