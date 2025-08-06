export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'image';
};

export type LoadingMessage = {
  id: string;
  role: 'assistant';
  type: 'loading';
  content?: never;
};

export type ChatMessage = Message | LoadingMessage;
