import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex items-start space-x-3 typing-indicator" data-testid="typing-indicator">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="text-primary-foreground text-sm" size={16} />
      </div>
      <div className="max-w-[80%] lg:max-w-[60%]">
        <div className="ai-message px-4 py-3 rounded-2xl rounded-tl-md">
          <div className="flex items-center space-x-1">
            <span className="text-muted-foreground text-sm">AI is typing</span>
            <div className="flex space-x-1 ml-2">
              <div className="w-1 h-1 bg-muted-foreground rounded-full dot-animation"></div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full dot-animation"></div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full dot-animation"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
