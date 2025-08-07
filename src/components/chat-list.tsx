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
  
  return (
    <div
      ref={listRef}
      className="flex flex-col gap-4 p-4 max-w-4xl mx-auto"
    >
      {messages.map((message, index) => (
        <ChatMessage key={message.id} message={message} index={index}/>
      ))}
    </div>
  );
}
