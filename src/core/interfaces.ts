import { AgentContext, AgentResponse } from '../types';

/**
 * Base interface for all AI agents in the orchestration system
 * Ensures modularity and consistent plugin architecture
 */
export interface AIAgent {
  readonly name: string;
  readonly version: string;
  readonly capabilities: string[];
  readonly dependencies: string[];

  /**
   * Initialize the agent with configuration
   */
  initialize(config: AgentConfig): Promise<void>;

  /**
   * Process a request with full context awareness
   */
  process(input: string, context: AgentContext): Promise<AgentResponse>;

  /**
   * Validate if the agent can handle the given input
   */
  canHandle(input: string, context: AgentContext): boolean;

  /**
   * Get agent health status for monitoring
   */
  getHealth(): HealthStatus;

  /**
   * Clean up resources
   */
  cleanup(): Promise<void>;
}

export interface AgentConfig {
  [key: string]: any;
  sophisticationAdaptation?: boolean;
  transformationFocus?: boolean;
  marketAdaptation?: boolean;
  qualityLoops?: boolean;
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastChecked: Date;
  metrics?: Record<string, number>;
  errors?: string[];
}

/**
 * Plugin interface for extending agent capabilities
 */
export interface AgentPlugin {
  readonly name: string;
  readonly version: string;
  readonly compatibleAgents: string[];

  /**
   * Install the plugin
   */
  install(agent: AIAgent): Promise<void>;

  /**
   * Uninstall the plugin
   */
  uninstall(agent: AIAgent): Promise<void>;

  /**
   * Check if plugin is compatible with agent version
   */
  isCompatible(agentVersion: string): boolean;
}

/**
 * Memory interface for context management
 */
export interface MemoryManager {
  /**
   * Store conversation context
   */
  storeContext(sessionId: string, context: AgentContext): Promise<void>;

  /**
   * Retrieve conversation context
   */
  getContext(sessionId: string): Promise<AgentContext | null>;

  /**
   * Compress long conversations
   */
  compressConversation(sessionId: string): Promise<void>;

  /**
   * Semantic search in conversation history
   */
  semanticSearch(query: string, sessionId?: string): Promise<any[]>;

  /**
   * Clear old context data
   */
  cleanup(olderThan: Date): Promise<void>;
}