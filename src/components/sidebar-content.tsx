'use client';

import { Plus, MessageSquare, Trash2, Edit } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent as SidebarMainContent,
  SidebarFooter,
  SidebarMenuAction,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import type { ChatMessage } from '@/lib/types';
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
    if (messages.length > 0) {
      const userMessage = messages.find(m => m.role === 'user');
      if (userMessage) {
        return userMessage.content.substring(0, 25);
      }
    }
    return 'New Chat';
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Button onClick={onNewChat} className="w-full justify-start" variant="ghost">
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      <ScrollArea className="flex-1 -mx-2">
        <SidebarMainContent className="px-2">
            <SidebarGroupLabel>Chats</SidebarGroupLabel>
            <SidebarMenu>
            {Object.entries(chatHistory).map(([id, messages]) => (
                <SidebarMenuItem key={id}>
                    <SidebarMenuButton
                        onClick={() => onSelectChat(id)}
                        isActive={activeChatId === id}
                        className="truncate"
                        variant="ghost"
                    >
                        <MessageSquare />
                        <span className='truncate'>{getChatTitle(messages)}</span>
                    </SidebarMenuButton>
                    <div className="flex items-center opacity-0 group-hover/menu-item:opacity-100 transition-opacity duration-200">
                        <SidebarMenuAction 
                            onClick={(e) => {
                                e.stopPropagation();
                                // Implement rename functionality here if needed
                            }}
                        >
                            <Edit />
                        </SidebarMenuAction>
                        <SidebarMenuAction 
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeleteChat(id);
                            }}
                        >
                            <Trash2 />
                        </SidebarMenuAction>
                    </div>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarMainContent>
      </ScrollArea>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}
