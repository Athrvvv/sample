'use client';

import * as React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Plus } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
      setSelectedFile(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
      // We can add more logic here to handle the file upload,
      // like showing a preview or sending it to the server.
    }
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };
  
  React.useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative flex items-center">
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
        />
        <Button variant="ghost" size="icon" className="absolute left-2 text-foreground/60" onClick={handleAddFileClick}>
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add file</span>
        </Button>
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedFile ? selectedFile.name : "Ask anything..."}
          className="flex-1 resize-none max-h-40 min-h-[52px] overflow-y-auto rounded-full border border-border bg-input pl-12 pr-12 py-3.5"
          rows={1}
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon" className="absolute right-2 self-center shrink-0 bg-accent hover:bg-accent/90 rounded-full h-9 w-9">
          <SendHorizonal className="h-5 w-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}
