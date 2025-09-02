import { AIAgent, AgentConfig, HealthStatus } from './interfaces';
import { AgentContext, AgentResponse } from '../types';

/**
 * Abstract base class for all AI agents
 * Implements common functionality and enforces modular design
 */
export abstract class BaseAgent implements AIAgent {
  public readonly name: string;
  public readonly version: string;
  public readonly capabilities: string[];
  public readonly dependencies: string[];

  protected config: AgentConfig = {};
  protected isInitialized: boolean = false;

  constructor(
    name: string,
    version: string,
    capabilities: string[],
    dependencies: string[] = []
  ) {
    this.name = name;
    this.version = version;
    this.capabilities = capabilities;
    this.dependencies = dependencies;
  }

  public async initialize(config: AgentConfig): Promise<void> {
    this.config = { ...config };
    await this.onInitialize();
    this.isInitialized = true;
  }

  public async process(input: string, context: AgentContext): Promise<AgentResponse> {
    if (!this.isInitialized) {
      throw new Error(`Agent ${this.name} is not initialized`);
    }

    if (!this.canHandle(input, context)) {
      throw new Error(`Agent ${this.name} cannot handle this input`);
    }

    // Pre-processing: adapt to user sophistication and transformation goals
    const adaptedInput = await this.adaptInput(input, context);
    
    // Core processing
    const response = await this.processCore(adaptedInput, context);
    
    // Post-processing: ensure transformation focus
    const adaptedResponse = await this.adaptResponse(response, context);
    
    return adaptedResponse;
  }

  public getHealth(): HealthStatus {
    return {
      status: this.isInitialized ? 'healthy' : 'unhealthy',
      lastChecked: new Date(),
      metrics: this.getMetrics(),
      errors: this.getErrors()
    };
  }

  public async cleanup(): Promise<void> {
    await this.onCleanup();
    this.isInitialized = false;
  }

  // Abstract methods that must be implemented by concrete agents
  public abstract canHandle(input: string, context: AgentContext): boolean;
  protected abstract onInitialize(): Promise<void>;
  protected abstract processCore(input: string, context: AgentContext): Promise<AgentResponse>;
  protected abstract onCleanup(): Promise<void>;

  // Default implementations that can be overridden
  protected async adaptInput(input: string, context: AgentContext): Promise<string> {
    if (!this.config.sophisticationAdaptation) {
      return input;
    }

    // Adapt input complexity based on user sophistication level
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    
    if (sophisticationLevel <= 2) {
      // Simplify for beginners
      return this.simplifyInput(input);
    } else if (sophisticationLevel >= 4) {
      // Add technical depth for advanced users
      return this.enhanceInput(input);
    }
    
    return input;
  }

  protected async adaptResponse(response: AgentResponse, context: AgentContext): Promise<AgentResponse> {
    let adaptedResponse = { ...response };

    // Add transformation focus
    if (this.config.transformationFocus) {
      adaptedResponse = await this.addTransformationValue(adaptedResponse, context);
    }

    // Market adaptation
    if (this.config.marketAdaptation) {
      adaptedResponse = await this.adaptToMarket(adaptedResponse, context);
    }

    return adaptedResponse;
  }

  protected simplifyInput(input: string): string {
    // Basic simplification logic
    return input.replace(/\b(technical|advanced|complex)\b/gi, 'simple');
  }

  protected enhanceInput(input: string): string {
    // Basic enhancement logic
    return `${input} (Please provide technical details and advanced considerations)`;
  }

  protected async addTransformationValue(response: AgentResponse, context: AgentContext): Promise<AgentResponse> {
    // Calculate how this response advances user transformation
    const transformationValue = this.calculateTransformationValue(response.content, context);
    
    return {
      ...response,
      transformationValue,
      nextActions: this.suggestTransformationActions(context)
    };
  }

  protected async adaptToMarket(response: AgentResponse, context: AgentContext): Promise<AgentResponse> {
    // Adapt response based on market sophistication and user journey stage
    const stage = context.userProfile.transformationJourney.stage;
    let adaptedContent = response.content;

    switch (stage) {
      case 'unaware':
        adaptedContent = `${adaptedContent}\n\n💡 This helps you discover new possibilities.`;
        break;
      case 'problem_aware':
        adaptedContent = `${adaptedContent}\n\n🎯 This addresses the challenge you're facing.`;
        break;
      case 'solution_aware':
        adaptedContent = `${adaptedContent}\n\n⚡ Here's why this approach works better.`;
        break;
      case 'product_aware':
        adaptedContent = `${adaptedContent}\n\n🚀 This differentiates from other options.`;
        break;
      case 'most_aware':
        adaptedContent = `${adaptedContent}\n\n✨ This aligns with your identity and goals.`;
        break;
    }

    return {
      ...response,
      content: adaptedContent
    };
  }

  protected calculateTransformationValue(content: string, context: AgentContext): number {
    // Simple heuristic - can be enhanced with ML models
    let value = 0.5; // Base value
    
    // Check if response addresses transformation goals
    for (const goal of context.transformationGoals) {
      if (content.toLowerCase().includes(goal.description.toLowerCase())) {
        value += 0.2;
      }
    }

    return Math.min(value, 1.0);
  }

  protected suggestTransformationActions(context: AgentContext): string[] {
    const actions: string[] = [];
    
    for (const goal of context.transformationGoals) {
      if (goal.progress < 100) {
        actions.push(`Continue working on: ${goal.description}`);
      }
    }

    return actions.slice(0, 3); // Limit to 3 actions
  }

  protected getMetrics(): Record<string, number> {
    return {
      uptime: this.isInitialized ? 1 : 0,
      memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024 // MB
    };
  }

  protected getErrors(): string[] {
    return this.isInitialized ? [] : ['Agent not initialized'];
  }
}