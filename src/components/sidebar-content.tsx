'use client';

import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent as SidebarMainContent,
  SidebarFooter,
  SidebarMenuAction
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

type ChatHistory = {
  [id: string]: ChatMessage[];
};

interface SidebarContentProps {
  chatHistory: ChatHistory;
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

export function SidebarContent({
  chatHistory,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: SidebarContentProps) {
  const getChatTitle = (messages: ChatMessage[]) => {
    if (messages.length > 1) {
      const userMessage = messages.find(m => m.role === 'user');
      return userMessage?.content?.substring(0, 30) || 'New Chat';
    }
    return 'New Chat';
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Button onClick={onNewChat} className="w-full justify-start" variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarMainContent>
            <SidebarMenu>
            {Object.entries(chatHistory).map(([id, messages]) => (
                <SidebarMenuItem key={id}>
                    <SidebarMenuButton
                        onClick={() => onSelectChat(id)}
                        isActive={activeChatId === id}
                        className="truncate"
                    >
                        <MessageSquare />
                        <span className='truncate'>{getChatTitle(messages)}</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction 
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(id);
                        }}
                        showOnHover
                    >
                        <Trash2 />
                    </SidebarMenuAction>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarMainContent>
      </ScrollArea>
      <SidebarFooter>
        {/* Can add footer content here */}
      </SidebarFooter>
    </Sidebar>
  );
}
