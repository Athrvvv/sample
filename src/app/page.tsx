'use client';

import * as React from 'react';
import { useToast } from '@/hooks/use-toast';
import { getAITextCompletion } from '@/ai/flows/get-ai-text-completion';
import { generateAiImage } from '@/ai/flows/generate-ai-image';
import type { ChatMessage } from '@/lib/types';
import { Header } from '@/components/header';
import { ChatList } from '@/components/chat-list';
import { ChatInput } from '@/components/chat-input';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { SidebarContent } from '@/components/sidebar-content';

type ChatHistory = {
  [id: string]: ChatMessage[];
};

export default function Home() {
  const { toast } = useToast();
  const [chatHistory, setChatHistory] = React.useState<ChatHistory>({});
  const [activeChatId, setActiveChatId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { setOpenMobile, state: sidebarState } = useSidebar();

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
    const savedActiveId = localStorage.getItem('activeChatId');
    if (savedActiveId) {
      setActiveChatId(savedActiveId);
    } else {
      handleNewChat();
    }
  }, []);

  React.useEffect(() => {
    if (Object.keys(chatHistory).length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  React.useEffect(() => {
    if (activeChatId) {
      localStorage.setItem('activeChatId', activeChatId);
    }
  }, [activeChatId]);

  const messages = activeChatId ? chatHistory[activeChatId] || [] : [];
  const isNewChat = messages.length <= 1;

  const handleNewChat = () => {
    const newId = crypto.randomUUID();
    const welcomeMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: "Hello! I'm PocketAI. How can I assist you today? You can ask me to generate images by starting your prompt with 'generate an image of...'",
      type: 'text',
    };
    setChatHistory(prev => ({ ...prev, [newId]: [welcomeMessage] }));
    setActiveChatId(newId);
    setOpenMobile(false);
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setOpenMobile(false);
  };
  
  const handleDeleteChat = (id: string) => {
    const newHistory = { ...chatHistory };
    delete newHistory[id];
    setChatHistory(newHistory);
    if (activeChatId === id) {
      const remainingIds = Object.keys(newHistory);
      if (remainingIds.length > 0) {
        setActiveChatId(remainingIds[0]);
      } else {
        handleNewChat();
      }
    }
    if(Object.keys(newHistory).length === 0) {
      localStorage.removeItem('chatHistory');
    }
  };

  const handleSend = async (content: string) => {
    if (isLoading || !activeChatId) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      type: 'text',
    };

    const currentChat = chatHistory[activeChatId] || [];

    const updatedMessages = isNewChat ? [userMessage] : [...currentChat.filter(m => m.type !== 'text' || m.content !== "Hello! I'm PocketAI. How can I assist you today? You can ask me to generate images by starting your prompt with 'generate an image of...'"), userMessage];

    setChatHistory(prev => ({
        ...prev,
        [activeChatId]: updatedMessages,
    }));
    
    const loadingMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      type: 'loading',
    };

    setChatHistory(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), loadingMessage],
    }));
    setIsLoading(true);

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
      setChatHistory(prev => {
        const currentChat = prev[activeChatId] || [];
        return {
          ...prev,
          [activeChatId]: [...currentChat.slice(0, -1), assistantMessage],
        };
      });
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'text',
      };
      setChatHistory(prev => {
        const currentChat = prev[activeChatId] || [];
        return {
          ...prev,
          [activeChatId]: [...currentChat.slice(0, -1), errorMessage],
        };
      });
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
    <div className="flex h-screen bg-background text-foreground">
      <SidebarContent 
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className={cn("flex flex-col flex-1 transition-all duration-300 ease-in-out", sidebarState === 'expanded' ? 'md:ml-64' : 'md:ml-16')}>
        <Header />
        <main className="flex-1 flex flex-col pt-16">
          <div className="flex-1 overflow-y-auto">
            {isNewChat ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-foreground/80">
                    <h1 className="text-4xl font-semibold">PocketAI</h1>
                    <p className="mt-2 text-lg">Ready when you are.</p>
                </div>
            ) : (
                <ChatList messages={messages} />
            )}
            </div>
            <div className="w-full">
              <ChatInput onSend={handleSend} isLoading={isLoading} />
            </div>
        </main>
      </div>
    </div>
  );
}
