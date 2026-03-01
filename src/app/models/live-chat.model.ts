export interface LiveChatResponse {
  success: boolean;
  flowId: string;
  stoppedAt: string;
  executedNodes: string[];
  finalOutput: string;
}

export interface SendMessageData {
  id: string;
  input: string;
}
