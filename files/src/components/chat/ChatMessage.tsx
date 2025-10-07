import { format } from "date-fns";
import { Bot, Check, CheckCheck } from "lucide-react";
import { Message } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export function ChatMessage({ message, isLast = false }: ChatMessageProps) {
  const isUser = message.role === "user";
  const timestamp = format(new Date(message.timestamp), "h:mm a");

  return (
    <div className={`flex items-start space-x-3 message-enter ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="text-primary-foreground text-sm" size={16} />
        </div>
      )}
      
      <div className={`max-w-[80%] lg:max-w-[60%] ${isUser ? 'order-first' : ''}`}>
        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'user-message rounded-tr-md' 
              : 'ai-message rounded-tl-md'
          }`}
          data-testid={`message-${message.role}-${message.id}`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <div className={`flex items-center space-x-2 mt-1 px-1 ${isUser ? 'justify-end' : ''}`}>
          <span className="text-xs text-muted-foreground" data-testid={`timestamp-${message.id}`}>
            {timestamp}
          </span>
          {isUser && (
            <CheckCheck className="text-primary text-xs" size={12} data-testid={`read-status-${message.id}`} />
          )}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-medium">
          U
        </div>
      )}
    </div>
  );
}
