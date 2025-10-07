import { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickActions = [
    "Explain a concept",
    "Write code", 
    "Brainstorm ideas"
  ];

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleQuickAction = (action: string) => {
    setMessage(action);
    textareaRef.current?.focus();
  };

  return (
    <div className="p-4">
      <div className="floating-input rounded-2xl border border-border">
        <form className="flex items-end space-x-3 p-4" onSubmit={handleSubmit}>
          <div className="flex-1 min-h-[20px] max-h-32">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none bg-transparent border-0 outline-none text-sm placeholder-muted-foreground leading-6"
              data-testid="input-message"
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-2 text-muted-foreground hover:text-foreground"
              data-testid="button-attachment"
            >
              <Paperclip size={16} />
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary text-primary-foreground p-2 hover:bg-primary/90"
              disabled={isLoading || !message.trim()}
              data-testid="button-send"
            >
              <Send size={16} />
            </Button>
          </div>
        </form>
      </div>
      
      <div className="flex items-center justify-center space-x-2 mt-3">
        {quickActions.map((action) => (
          <Button
            key={action}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(action)}
            className="px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-full hover:bg-accent transition-colors"
            data-testid={`button-quick-${action.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
}
