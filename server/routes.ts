import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "your-api-key-here"
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get chat messages for a session
  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getMessagesBySession(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send a message and get AI response
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createMessage(validatedData);
      
      // Get chat history for context
      const chatHistory = await storage.getMessagesBySession(validatedData.sessionId);
      
      // Prepare messages for OpenAI API
      const openaiMessages = chatHistory.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));

      // Get AI response
      // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
      const completion = await openai.chat.completions.create({
        model: "gpt-5",
        messages: openaiMessages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      const aiResponseContent = completion.choices[0]?.message?.content;
      
      if (!aiResponseContent) {
        throw new Error("No response from AI");
      }

      // Save AI response
      const aiMessage = await storage.createMessage({
        content: aiResponseContent,
        role: "assistant",
        sessionId: validatedData.sessionId,
      });

      res.json({
        userMessage,
        aiMessage
      });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to process message" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
