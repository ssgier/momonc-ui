import { handleMessage } from "./service/messageHandlers.js";

export function refresh(sharedState, timeElapsed) {
  const processingState = sharedState.processingState;
  if (processingState.candidateEvalQueue) {
    const queue = processingState.candidateEvalQueue;
    processingState.timeElapsed = timeElapsed;
    while (queue.size() > sharedState.domainState.Processing.window_size_hint) {
      queue.dequeue();
    }
  }

  handleComm(sharedState);
}

function handleComm(sharedState) {
  if (sharedState.commState.state === "disconnected") {
    let webSocket = (sharedState.commState.webSocket = new WebSocket(
      "ws://127.0.0.1:3000"
    ));
    webSocket.addEventListener("open", () => {
      sharedState.commState.state = "connected";
    });
    webSocket.addEventListener("close", () => {
      sharedState.commState.state = "disconnected";
    });
    webSocket.addEventListener("error", () => {
      sharedState.commState.state = "disconnected";
    });
    webSocket.addEventListener("message", (event) => {
      handleMessage(sharedState, event.data);
    });
  }
}
