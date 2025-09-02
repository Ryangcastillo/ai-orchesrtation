import { AIAgent, MemoryManager } from './interfaces';
import { AgentContext, AgentResponse } from '../types';

/**
 * Main orchestrator for managing AI agents and their interactions
 * Provides plugin architecture for easy integration into applications
 */
export class AIOrchestrator {
  private agents: Map<string, AIAgent> = new Map();
  private memoryManager: MemoryManager;
  private config: OrchestratorConfig;

  constructor(memoryManager: MemoryManager, config: OrchestratorConfig = {}) {
    this.memoryManager = memoryManager;
    this.config = {
      enableSophisticationAdaptation: true,
      enableTransformationTracking: true,
      enableQualityLoops: true,
      maxContextWindow: 30,
      ...config
    };
  }

  /**
   * Register an agent with the orchestrator
   */
  public async registerAgent(agent: AIAgent, config?: any): Promise<void> {
    await agent.initialize(config || {});
    this.agents.set(agent.name, agent);
    console.log(`Agent ${agent.name} registered successfully`);
  }

  /**
   * Unregister an agent
   */
  public async unregisterAgent(agentName: string): Promise<void> {
    const agent = this.agents.get(agentName);
    if (agent) {
      await agent.cleanup();
      this.agents.delete(agentName);
      console.log(`Agent ${agentName} unregistered successfully`);
    }
  }

  /**
   * Process a user input with automatic agent selection
   */
  public async process(
    input: string,
    sessionId: string,
    userId?: string,
    projectContext?: any
  ): Promise<AgentResponse> {
    try {
      // Load context from memory
      const context = await this.loadContext(sessionId, userId, projectContext);
      
      // Select appropriate agent
      const agent = this.selectAgent(input, context);
      
      if (!agent) {
        throw new Error('No suitable agent found for this input');
      }

      // Process with selected agent
      const response = await agent.process(input, context);
      
      // Store updated context
      await this.storeContext(sessionId, context, input, response);
      
      // Apply quality loops if enabled
      if (this.config.enableQualityLoops) {
        return await this.applyQualityEnhancements(response, context);
      }

      return response;
    } catch (error) {
      console.error('Error processing input:', error);
      return {
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        confidence: 0.1,
        transformationValue: 0
      };
    }
  }

  /**
   * Get available agents and their capabilities
   */
  public getAvailableAgents(): Array<{ name: string; capabilities: string[] }> {
    return Array.from(this.agents.values()).map(agent => ({
      name: agent.name,
      capabilities: agent.capabilities
    }));
  }

  /**
   * Get health status of all agents
   */
  public async getSystemHealth(): Promise<SystemHealth> {
    const agentHealths = Array.from(this.agents.values()).map(agent => ({
      name: agent.name,
      health: agent.getHealth()
    }));

    const overallStatus = agentHealths.every(ah => ah.health.status === 'healthy') ? 'healthy' :
                         agentHealths.some(ah => ah.health.status === 'unhealthy') ? 'unhealthy' : 'degraded';

    return {
      overall: overallStatus,
      agents: agentHealths,
      memorySystem: await this.getMemoryHealth(),
      lastChecked: new Date()
    };
  }

  /**
   * Update user sophistication level for a session
   */
  public async updateUserSophistication(sessionId: string, level: number): Promise<void> {
    return this.updateUserSophisticationInternal(sessionId, level);
  }

  /**
   * Plugin-friendly interface for chatbot integration
   */
  public createChatbotPlugin(): ChatbotPlugin {
    const orchestrator = this; // Capture 'this' in closure
    return {
      name: 'ai-orchestrator',
      version: '1.0.0',
      
      async handleMessage(message: string, sessionId: string, userId?: string): Promise<string> {
        const response = await orchestrator.process(message, sessionId, userId);
        return response.content;
      },
      
      async handleCommand(command: string, args: string[], sessionId: string): Promise<string> {
        switch (command) {
          case 'agents':
            const agents = orchestrator.getAvailableAgents();
            return `Available agents: ${agents.map((a: any) => a.name).join(', ')}`;
          
          case 'health':
            const health = await orchestrator.getSystemHealth();
            return `System status: ${health.overall}`;
          
          case 'sophistication':
            if (args.length > 0) {
              const level = parseInt(args[0]);
              if (level >= 1 && level <= 5) {
                await orchestrator.updateUserSophistication(sessionId, level);
                return `Sophistication level updated to ${level}`;
              }
            }
            return 'Usage: /sophistication <1-5>';
          
          default:
            return 'Unknown command';
        }
      }
    };
  }

  private async loadContext(sessionId: string, userId?: string, projectContext?: any): Promise<AgentContext> {
    // Try to get existing context from memory
    let context = await this.memoryManager.getContext(sessionId);
    
    if (!context) {
      // Create new context
      context = {
        sessionId,
        userId,
        conversationHistory: [],
        userProfile: {
          id: userId || 'anonymous',
          preferences: {},
          sophisticationLevel: 3, // Default middle level
          transformationJourney: {
            stage: 'problem_aware',
            progression: 0,
            ahamoments: []
          }
        },
        sophisticationLevel: 3,
        transformationGoals: [],
        projectContext
      };
    }

    return context;
  }

  private async storeContext(
    sessionId: string,
    context: AgentContext,
    input: string,
    response: AgentResponse
  ): Promise<void> {
    // Add new messages to conversation history
    context.conversationHistory.push({
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    });

    context.conversationHistory.push({
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      metadata: {
        confidence: response.confidence,
        transformationValue: response.transformationValue
      }
    });

    // Trim conversation history if it exceeds max window
    if (context.conversationHistory.length > (this.config.maxContextWindow || 30) * 2) {
      const excess = context.conversationHistory.length - (this.config.maxContextWindow || 30) * 2;
      context.conversationHistory = context.conversationHistory.slice(excess);
    }

    // Store updated context
    await this.memoryManager.storeContext(sessionId, context);

    // Compress if needed
    if (context.conversationHistory.length >= (this.config.maxContextWindow || 30) * 2) {
      await this.memoryManager.compressConversation(sessionId);
    }
  }

  private selectAgent(input: string, context: AgentContext): AIAgent | null {
    // Find agents that can handle this input
    const capableAgents = Array.from(this.agents.values())
      .filter(agent => agent.canHandle(input, context));

    if (capableAgents.length === 0) {
      return null;
    }

    // For now, return the first capable agent
    // TODO: Implement more sophisticated selection logic
    return capableAgents[0];
  }

  private async applyQualityEnhancements(
    response: AgentResponse,
    context: AgentContext
  ): Promise<AgentResponse> {
    // Apply transformation focus enhancement
    if (this.config.enableTransformationTracking) {
      response = await this.enhanceWithTransformationTracking(response, context);
    }

    // Apply sophistication adaptation
    if (this.config.enableSophisticationAdaptation) {
      response = await this.enhanceWithSophisticationAdaptation(response, context);
    }

    return response;
  }

  private async enhanceWithTransformationTracking(
    response: AgentResponse,
    context: AgentContext
  ): Promise<AgentResponse> {
    // Calculate and add transformation insights
    const transformationInsights = this.calculateTransformationInsights(response, context);
    
    if (transformationInsights.length > 0) {
      response.content += '\n\n🎯 **Transformation Insights**:\n';
      response.content += transformationInsights.map(insight => `• ${insight}`).join('\n');
    }

    return response;
  }

  private async enhanceWithSophisticationAdaptation(
    response: AgentResponse,
    context: AgentContext
  ): Promise<AgentResponse> {
    const level = context.userProfile.sophisticationLevel;
    
    // Add sophistication-appropriate enhancements
    if (level <= 2) {
      response.content += '\n\n💡 *Need clarification on anything? Feel free to ask for simpler explanations.*';
    } else if (level >= 4) {
      response.content += '\n\n🔧 *Want more technical details or implementation specifics? Let me know.*';
    }

    return response;
  }

  private calculateTransformationInsights(
    response: AgentResponse,
    context: AgentContext
  ): string[] {
    const insights: string[] = [];
    
    // Check if response addresses transformation goals
    for (const goal of context.transformationGoals) {
      if (response.content.toLowerCase().includes(goal.description.toLowerCase())) {
        insights.push(`This advances your goal: "${goal.description}" (${goal.progress}% complete)`);
      }
    }

    // Check for potential "aha moments"
    if (response.transformationValue > 0.7) {
      insights.push('This insight could be a breakthrough moment in your journey');
    }

    return insights;
  }

  private async updateUserSophisticationInternal(sessionId: string, level: number): Promise<void> {
    const context = await this.memoryManager.getContext(sessionId);
    if (context) {
      context.userProfile.sophisticationLevel = level;
      context.sophisticationLevel = level;
      await this.memoryManager.storeContext(sessionId, context);
    }
  }

  private async getMemoryHealth(): Promise<any> {
    // TODO: Implement memory system health check
    return {
      status: 'healthy',
      connections: 'active',
      lastCompression: new Date()
    };
  }
}

export interface OrchestratorConfig {
  enableSophisticationAdaptation?: boolean;
  enableTransformationTracking?: boolean;
  enableQualityLoops?: boolean;
  maxContextWindow?: number;
}

export interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  agents: Array<{ name: string; health: any }>;
  memorySystem: any;
  lastChecked: Date;
}

export interface ChatbotPlugin {
  name: string;
  version: string;
  handleMessage(message: string, sessionId: string, userId?: string): Promise<string>;
  handleCommand(command: string, args: string[], sessionId: string): Promise<string>;
}