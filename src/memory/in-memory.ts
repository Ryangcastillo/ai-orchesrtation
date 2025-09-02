import { MemoryManager } from '../core/interfaces';
import { AgentContext } from '../types';

/**
 * Simple in-memory implementation of MemoryManager
 * For production, replace with vector database implementation
 */
export class InMemoryManager implements MemoryManager {
  private contexts: Map<string, AgentContext> = new Map();
  private compressionThreshold: number;

  constructor(compressionThreshold: number = 100) {
    this.compressionThreshold = compressionThreshold;
  }

  async storeContext(sessionId: string, context: AgentContext): Promise<void> {
    this.contexts.set(sessionId, { ...context });
  }

  async getContext(sessionId: string): Promise<AgentContext | null> {
    const context = this.contexts.get(sessionId);
    return context ? { ...context } : null;
  }

  async compressConversation(sessionId: string): Promise<void> {
    const context = this.contexts.get(sessionId);
    if (!context || context.conversationHistory.length < this.compressionThreshold) {
      return;
    }

    // Simple compression: keep first and last 20 messages, summarize the middle
    const history = context.conversationHistory;
    const keepStart = history.slice(0, 20);
    const keepEnd = history.slice(-20);
    const toCompress = history.slice(20, -20);

    if (toCompress.length > 0) {
      // Create a summary message
      const summary = {
        id: `summary-${Date.now()}`,
        role: 'system' as const,
        content: `[Conversation Summary: ${toCompress.length} messages covering topics like: ${this.extractTopics(toCompress).join(', ')}]`,
        timestamp: new Date()
      };

      context.conversationHistory = [...keepStart, summary, ...keepEnd];
      this.contexts.set(sessionId, context);
    }
  }

  async semanticSearch(query: string, sessionId?: string): Promise<any[]> {
    const results: any[] = [];
    const queryLower = query.toLowerCase();

    const contextsToSearch = sessionId 
      ? [this.contexts.get(sessionId)].filter(Boolean)
      : Array.from(this.contexts.values());

    for (const context of contextsToSearch) {
      if (!context) continue;

      for (const message of context.conversationHistory) {
        if (message.content.toLowerCase().includes(queryLower)) {
          results.push({
            sessionId: context.sessionId,
            message,
            relevance: this.calculateRelevance(message.content, query)
          });
        }
      }
    }

    return results.sort((a, b) => b.relevance - a.relevance);
  }

  async cleanup(olderThan: Date): Promise<void> {
    const sessionsToDelete: string[] = [];

    for (const [sessionId, context] of this.contexts.entries()) {
      const lastMessage = context.conversationHistory[context.conversationHistory.length - 1];
      if (lastMessage && lastMessage.timestamp < olderThan) {
        sessionsToDelete.push(sessionId);
      }
    }

    for (const sessionId of sessionsToDelete) {
      this.contexts.delete(sessionId);
    }

    console.log(`Cleaned up ${sessionsToDelete.length} old sessions`);
  }

  private extractTopics(messages: any[]): string[] {
    const topics = new Set<string>();
    const keywords = ['project', 'design', 'architecture', 'development', 'planning', 'testing'];

    for (const message of messages) {
      for (const keyword of keywords) {
        if (message.content.toLowerCase().includes(keyword)) {
          topics.add(keyword);
        }
      }
    }

    return Array.from(topics);
  }

  private calculateRelevance(content: string, query: string): number {
    const contentLower = content.toLowerCase();
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(' ');
    
    let relevance = 0;
    
    // Exact match bonus
    if (contentLower.includes(queryLower)) {
      relevance += 1.0;
    }
    
    // Word match scoring
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        relevance += 0.3;
      }
    }
    
    return relevance;
  }
}