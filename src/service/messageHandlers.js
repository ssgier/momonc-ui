import Queue from "queue-fifo";
import { resetProcessingState } from "../store.js";
import { refresh } from "../refresh.js";

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
    } else if (sharedState.domainState.Processing) {
      prepareProcessingState(sharedState);
    }
  } else if (message.CandidateEvalReport) {
    handleCandidateEvalReport(sharedState, message.CandidateEvalReport);
  } else if (message.Time) {
    refresh(sharedState, message.Time);
  }
}

function prepareProcessingState(sharedState) {
  const processingStateMessage = sharedState.domainState.Processing;
  sharedState.processingState.candidateEvalQueue = new Queue();
  sharedState.processingState.bestSeenCandidates =
    processingStateMessage.best_seen_candidate_eval_reports;
  processingStateMessage.recent_candidate_eval_reports.forEach((report) =>
    handleCandidateEvalReport(sharedState, report)
  );
  refresh(sharedState, processingStateMessage.time);
}

function handleCandidateEvalReport(sharedState, candidateEvalReport) {
  if (candidateEvalReport.obj_func_val) {
    sharedState.processingState.candidateEvalQueue.enqueue(candidateEvalReport);

    const bestSeenCandidates = sharedState.processingState.bestSeenCandidates;
    const tableSizeHint =
      sharedState.domainState.Processing.best_seen_table_size_hint;
    if (
      bestSeenCandidates.length < tableSizeHint ||
      candidateEvalReport.obj_func_val <
        bestSeenCandidates[bestSeenCandidates.length - 1].obj_func_val
    ) {
      bestSeenCandidates.push(candidateEvalReport);
      bestSeenCandidates.sort((a, b) => a.obj_func_val - b.obj_func_val);
      if (bestSeenCandidates.length > tableSizeHint) {
        bestSeenCandidates.pop();
      }
    }
  }
}
