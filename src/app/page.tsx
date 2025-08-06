'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { getAITextCompletion } from '@/ai/flows/get-ai-text-completion';
import { generateAiImage } from '@/ai/flows/generate-ai-image';
import type { ChatMessage } from '@/lib/types';
import { Header } from '@/components/header';
import { ChatList } from '@/components/chat-list';
import { ChatInput } from '@/components/chat-input';

export default function Home() {
  const { toast } = useToast();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // crypto.randomUUID is only available in secure contexts (HTTPS) or on the client.
    if (typeof window !== 'undefined') {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "Hello! I'm PocketAI. How can I assist you today? You can ask me to generate images by starting your prompt with 'generate an image of...'",
          type: 'text',
        },
      ]);
    }
  }, []);

  const handleSend = async (content: string) => {
    if (isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      type: 'text',
    };
    
    setIsLoading(true);

    const loadingMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      type: 'loading',
    };
    setMessages(prev => [...prev, userMessage, loadingMessage]);

    try {
      let assistantMessage: ChatMessage;
      const isImageRequest = content.toLowerCase().startsWith('generate an image of');

      if (isImageRequest) {
        const result = await generateAiImage({ prompt: content });
        assistantMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: result.imageUrl,
          type: 'image',
        };
      } else {
        const result = await getAITextCompletion({ prompt: content });
        assistantMessage = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: result.text,
          type: 'text',
        };
      }
      setMessages(prev => [...prev.slice(0, -1), assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'text',
      };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the AI.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto pt-20 pb-28">
        <ChatList messages={messages} />
      </main>
      <footer className="fixed bottom-0 left-0 right-0 w-full">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </footer>
    </div>
  );
}
