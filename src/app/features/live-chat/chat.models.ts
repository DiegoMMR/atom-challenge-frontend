export type { LiveChatResponse, SendMessageData } from '../../models/live-chat.model';

export type Role = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  ts: number; // epoch ms
  status?: 'sent' | 'error';
}

export interface ChatUiState {
  isWaiting: boolean;
  error: string | null;
}
