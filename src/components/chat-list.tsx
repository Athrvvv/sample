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

  // Filter out the initial welcome message if a user has sent a message
  const filteredMessages = messages.length > 1 && messages[0].role === 'assistant' 
    ? messages.slice(1)
    : messages;


  return (
    <div
      ref={listRef}
      className="flex flex-col gap-4 p-4 max-w-4xl mx-auto pt-24 pb-12"
    >
      {filteredMessages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
