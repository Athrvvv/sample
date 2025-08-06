import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import Image from 'next/image';

const LoadingIndicator = () => (
  <div className="flex items-center space-x-2">
    <span className="h-2 w-2 bg-current rounded-full animate-pulse [animation-delay:-0.3s]"></span>
    <span className="h-2 w-2 bg-current rounded-full animate-pulse [animation-delay:-0.15s]"></span>
    <span className="h-2 w-2 bg-current rounded-full animate-pulse"></span>
  </div>
);

export function ChatMessage({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn('flex items-start gap-3', {
        'justify-end': !isAssistant,
      })}
    >
      {isAssistant && (
        <Avatar className="h-8 w-8 bg-card border">
          <AvatarFallback className="bg-transparent">
            <Bot className="h-5 w-5 text-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3 text-sm shadow-sm',
          isAssistant
            ? 'bg-card text-card-foreground'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.type === 'loading' ? (
          <LoadingIndicator />
        ) : message.type === 'image' && message.content ? (
          <Image
            src={message.content}
            alt="Generated image"
            width={256}
            height={256}
            className="rounded-md"
            data-ai-hint="abstract painting"
          />
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
      {!isAssistant && (
        <Avatar className="h-8 w-8 bg-primary border border-primary-foreground/20">
          <AvatarFallback className="bg-transparent">
            <User className="h-5 w-5 text-primary-foreground" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
