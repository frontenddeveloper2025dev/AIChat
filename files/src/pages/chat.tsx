import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Bot, Settings, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { MessageInput } from "@/components/chat/MessageInput";
import { apiRequest } from "@/lib/queryClient";
import { Message } from "@shared/schema";

export default function Chat() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch existing messages
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/chat", sessionId],
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        content,
        role: "user",
        sessionId,
      });
      return response.json();
    },
    onMutate: () => {
      setIsTyping(true);
    },
    onSuccess: (data) => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries({ queryKey: ["/api/chat", sessionId] });
      setIsTyping(false);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsTyping(false);
    },
  });

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    sendMessageMutation.mutate(content);
  };

  if (isLoading) {
    return (
      <div className="chat-container min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="chat-container min-h-screen flex flex-col" data-testid="chat-container">
      {/* Chat Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="text-primary-foreground text-lg" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground" data-testid="text-app-title">
              AI Assistant
            </h1>
            <p className="text-sm text-muted-foreground" data-testid="text-connection-status">
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-muted-foreground hover:text-foreground"
            data-testid="button-settings"
          >
            <Settings size={18} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-muted-foreground hover:text-foreground"
            data-testid="button-menu"
          >
            <MoreVertical size={18} />
          </Button>
        </div>
      </header>

      {/* Chat Messages Container */}
      <main className="flex-1 overflow-y-auto chat-scroll px-4 py-6 space-y-4" data-testid="chat-messages">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <>
            <div className="flex justify-center">
              <div className="bg-muted text-muted-foreground px-4 py-2 rounded-full text-sm">
                Today
              </div>
            </div>
            <div className="flex items-start space-x-3 message-enter">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="text-primary-foreground text-sm" size={16} />
              </div>
              <div className="max-w-[80%] lg:max-w-[60%]">
                <div className="ai-message px-4 py-3 rounded-2xl rounded-tl-md">
                  <p className="text-sm leading-relaxed">
                    Hello! I'm your AI assistant. I'm here to help you with any questions or tasks you might have. Feel free to ask me anything!
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-1 px-1">
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <ChatMessage
            key={message.id}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Message Input */}
      <MessageInput
        onSendMessage={handleSendMessage}
        isLoading={sendMessageMutation.isPending}
      />
    </div>
  );
}
