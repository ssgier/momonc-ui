export function handleMessage(sharedState, message_text) {
  let message = JSON.parse(message_text);
  sharedState.commState.requestState = "ready";
  sharedState.domainState = message.DomainState;
  if (message.DomainState) {
    if (sharedState.domainState.Idle) {
      let default_data = sharedState.domainState.Idle;
      sharedState.uiState.specFile = default_data.spec_file;
      sharedState.uiState.executable = default_data.program;
      sharedState.uiState.args = default_data.args.map((arg) => ({
        value: arg,
      }));
      if (default_data.algo_conf.ParallelHillClimbing) {
        let conf = default_data.algo_conf.ParallelHillClimbing;
        sharedState.uiState.parallelism = conf.degree_of_par;
        sharedState.uiState.relativeStdDev = conf.relative_std_dev;
      }
    }
  }
}
