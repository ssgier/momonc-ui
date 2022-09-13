import config from "./config.js";

export default function startRefresher(processingState) {
  setInterval(() => refresh(processingState), config.refreshIntervalMs);
}

function refresh(processingState) {
  if (processingState.processingStartTime) {
    const queue = processingState.candidateEvalQueue;
    processingState.timeElapsed =
      1e-3 * (Date.now() - processingState.processingStartTime);
    while (
      !queue.isEmpty() &&
      processingState.timeElapsed - queue.peek().completion_time >
        config.candidateEvolutionChart.windowLengthSeconds
    ) {
      queue.dequeue();
    }
  }
}
