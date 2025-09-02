import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AIOrchestrator } from './core/orchestrator';
import { InMemoryManager } from './memory/in-memory';
import { TechnicalStrategyAgent } from './agents/technical-strategy';
import { AgileCoordinatorAgent } from './agents/agile-coordinator';
import { DesignLeadAgent } from './agents/design-lead';
import { BackendEngineerAgent } from './agents/backend-engineer';
import config from './config';

// Export main classes for plugin use
export { AIOrchestrator } from './core/orchestrator';
export { BaseAgent } from './core/base-agent';
export { TechnicalStrategyAgent } from './agents/technical-strategy';
export { AgileCoordinatorAgent } from './agents/agile-coordinator';
export { DesignLeadAgent } from './agents/design-lead';
export { BackendEngineerAgent } from './agents/backend-engineer';
export * from './types';
export * from './core/interfaces';

/**
 * Initialize the AI Orchestration System
 */
export async function createAIOrchestrator(): Promise<AIOrchestrator> {
  // Initialize memory manager
  const memoryManager = new InMemoryManager(config.memory.compressionThreshold);
  
  // Create orchestrator
  const orchestrator = new AIOrchestrator(memoryManager, {
    enableSophisticationAdaptation: config.marketAdaptation.enableMarketAdaptation,
    enableTransformationTracking: config.features.enableTransformationTracking,
    enableQualityLoops: config.features.enableQualityLoops,
    maxContextWindow: config.memory.contextWindowSize
  });

  // Register default agents
  const technicalStrategyAgent = new TechnicalStrategyAgent();
  const agileCoordinatorAgent = new AgileCoordinatorAgent();
  const designLeadAgent = new DesignLeadAgent();
  const backendEngineerAgent = new BackendEngineerAgent();

  await orchestrator.registerAgent(technicalStrategyAgent, {
    sophisticationAdaptation: true,
    transformationFocus: true,
    marketAdaptation: true,
    qualityLoops: true
  });

  await orchestrator.registerAgent(agileCoordinatorAgent, {
    sophisticationAdaptation: true,
    transformationFocus: true,
    marketAdaptation: true,
    qualityLoops: true
  });

  await orchestrator.registerAgent(designLeadAgent, {
    sophisticationAdaptation: true,
    transformationFocus: true,
    marketAdaptation: true,
    qualityLoops: true
  });

  await orchestrator.registerAgent(backendEngineerAgent, {
    sophisticationAdaptation: true,
    transformationFocus: true,
    marketAdaptation: true,
    qualityLoops: true
  });

  return orchestrator;
}

/**
 * Create Express server with API endpoints
 */
export function createServer(orchestrator: AIOrchestrator): express.Application {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/health', async (req: Request, res: Response) => {
    try {
      const health = await orchestrator.getSystemHealth();
      res.json(health);
    } catch (error) {
      res.status(500).json({ error: 'Health check failed' });
    }
  });

  // Main processing endpoint
  app.post('/process', async (req: Request, res: Response) => {
    try {
      const { input, sessionId, userId, projectContext } = req.body;
      
      if (!input || !sessionId) {
        return res.status(400).json({ 
          error: 'Missing required fields: input and sessionId' 
        });
      }

      const response = await orchestrator.process(input, sessionId, userId, projectContext);
      res.json(response);
    } catch (error) {
      console.error('Processing error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Get available agents
  app.get('/agents', (req: Request, res: Response) => {
    const agents = orchestrator.getAvailableAgents();
    res.json(agents);
  });

  // Chatbot plugin endpoint
  app.post('/chat', async (req: Request, res: Response) => {
    try {
      const { message, sessionId, userId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ 
          error: 'Missing required fields: message and sessionId' 
        });
      }

      const plugin = orchestrator.createChatbotPlugin();
      const response = await plugin.handleMessage(message, sessionId, userId);
      
      res.json({ response });
    } catch (error) {
      console.error('Chat processing error:', error);
      res.status(500).json({ error: 'Chat processing failed' });
    }
  });

  // Command handling endpoint
  app.post('/command', async (req: Request, res: Response) => {
    try {
      const { command, args, sessionId } = req.body;
      
      if (!command || !sessionId) {
        return res.status(400).json({ 
          error: 'Missing required fields: command and sessionId' 
        });
      }

      const plugin = orchestrator.createChatbotPlugin();
      const response = await plugin.handleCommand(command, args || [], sessionId);
      
      res.json({ response });
    } catch (error) {
      console.error('Command processing error:', error);
      res.status(500).json({ error: 'Command processing failed' });
    }
  });

  return app;
}

// Main entry point when run directly
async function main(): Promise<void> {
  try {
    console.log('🚀 Starting AI Orchestration System...');
    
    const orchestrator = await createAIOrchestrator();
    const app = createServer(orchestrator);
    
    const server = app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
      console.log(`📊 Environment: ${config.nodeEnv}`);
      console.log(`🎯 Available agents: ${orchestrator.getAvailableAgents().length}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('📤 Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Run if this is the main module
if (require.main === module) {
  main();
}