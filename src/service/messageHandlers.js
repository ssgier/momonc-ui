import Queue from "queue-fifo";
import { processingStateResetValue } from "../store.js";

export function handleMessage(sharedState, message_text) {
  let message = JSON.parse(message_text);
  sharedState.commState.requestState = "ready";
  if (message.DomainState) {
    resetProcessingState(sharedState);
    sharedState.domainState = message.DomainState;
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
    } else if (sharedState.domainState == "Processing") {
      prepareProcessingState(sharedState.processingState);
    }
  } else if (message.CandidateEvalReport) {
    handleCandidateEvalReport(
      sharedState.processingState,
      message.CandidateEvalReport
    );
  }
}

function resetProcessingState(sharedState) {
  sharedState.processingState = processingStateResetValue;
}

function prepareProcessingState(processingState) {
  processingState.processingStartTime = Date.now();
  processingState.candidateEvalQueue = new Queue();
}

function handleCandidateEvalReport(processingState, candidateEvalReport) {
  processingState.candidateEvalQueue.enqueue(candidateEvalReport);
}
