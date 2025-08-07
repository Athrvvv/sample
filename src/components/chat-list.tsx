'use client';

import * as React from 'react';
import type { ChatMessage as ChatMessageType } from '@/lib/types';
import { ChatMessage } from './chat-message';

interface ChatListProps {
  messages: ChatMessageType[];
}

export function ChatList({ messages }: ChatListProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
        listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, 100)
  }, [messages]);

  if (!messages.length) {
    return null;
  }
  
  const filteredMessages = messages.filter(m => m.content !== "Hello! I'm PocketAI. How can I assist you today? You can ask me to generate images by starting your prompt with 'generate an image of...'");

  return (
    <div
      ref={listRef}
      className="flex flex-col gap-4 p-4 max-w-4xl mx-auto"
    >
      {filteredMessages.map((message, index) => (
        <ChatMessage key={message.id} message={message} index={index}/>
      ))}
    </div>
  );
}
