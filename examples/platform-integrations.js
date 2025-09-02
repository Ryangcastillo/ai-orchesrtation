/**
 * Complete Integration Examples
 * Shows how to integrate AI Orchestration system into various platforms
 */

const { createAIOrchestrator } = require('../dist/index.js');

// =============================================================================
// 1. DISCORD BOT INTEGRATION
// =============================================================================

class DiscordAIBot {
  constructor() {
    this.orchestrator = null;
    this.plugin = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
    this.plugin = this.orchestrator.createChatbotPlugin();
  }

  // Discord message handler
  async handleDiscordMessage(message) {
    const sessionId = `discord-${message.channel.id}`;
    const userId = message.author.id;
    
    // Handle commands
    if (message.content.startsWith('!ai ')) {
      const query = message.content.slice(4);
      return await this.plugin.handleMessage(query, sessionId, userId);
    }
    
    // Handle mentions
    if (message.mentions.has(this.client.user)) {
      const query = message.content.replace(/<@!\d+>/g, '').trim();
      return await this.plugin.handleMessage(query, sessionId, userId);
    }
    
    return null; // Not for us
  }
}

// =============================================================================
// 2. SLACK BOT INTEGRATION  
// =============================================================================

class SlackAIBot {
  constructor(app) {
    this.app = app;
    this.orchestrator = null;
    this.plugin = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
    this.plugin = this.orchestrator.createChatbotPlugin();
    
    // Set up Slack event handlers
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // Handle direct messages
    this.app.message(async ({ message, say }) => {
      if (message.channel_type === 'im') {
        const response = await this.plugin.handleMessage(
          message.text,
          `slack-${message.channel}`,
          message.user
        );
        await say(response);
      }
    });

    // Handle mentions in channels
    this.app.event('app_mention', async ({ event, say }) => {
      const cleanText = event.text.replace(/<@[^>]+>/g, '').trim();
      const response = await this.plugin.handleMessage(
        cleanText,
        `slack-${event.channel}`,
        event.user
      );
      await say(response);
    });

    // Handle slash commands
    this.app.command('/ai', async ({ command, ack, respond }) => {
      await ack();
      
      if (command.text.startsWith('/')) {
        const [cmd, ...args] = command.text.slice(1).split(' ');
        const response = await this.plugin.handleCommand(
          cmd,
          args,
          `slack-${command.channel_id}`
        );
        await respond(response);
      } else {
        const response = await this.plugin.handleMessage(
          command.text,
          `slack-${command.channel_id}`,
          command.user_id
        );
        await respond(response);
      }
    });
  }
}

// =============================================================================
// 3. TELEGRAM BOT INTEGRATION
// =============================================================================

class TelegramAIBot {
  constructor(bot) {
    this.bot = bot;
    this.orchestrator = null;
    this.plugin = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
    this.plugin = this.orchestrator.createChatbotPlugin();
    
    this.setupHandlers();
  }

  setupHandlers() {
    // Handle text messages
    this.bot.on('text', async (ctx) => {
      const sessionId = `telegram-${ctx.chat.id}`;
      const userId = ctx.from.id.toString();
      
      let response;
      
      if (ctx.message.text.startsWith('/')) {
        const [command, ...args] = ctx.message.text.slice(1).split(' ');
        response = await this.plugin.handleCommand(command, args, sessionId);
      } else {
        response = await this.plugin.handleMessage(ctx.message.text, sessionId, userId);
      }
      
      await ctx.reply(response);
    });

    // Handle callback queries for interactive features
    this.bot.on('callback_query', async (ctx) => {
      const sessionId = `telegram-${ctx.chat.id}`;
      const response = await this.plugin.handleMessage(
        `User selected: ${ctx.callbackQuery.data}`,
        sessionId,
        ctx.from.id.toString()
      );
      
      await ctx.answerCbQuery();
      await ctx.editMessageText(response);
    });
  }
}

// =============================================================================
// 4. WEB API INTEGRATION
// =============================================================================

class WebAPIIntegration {
  constructor() {
    this.orchestrator = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
  }

  // Express.js route handlers
  createExpressRoutes(app) {
    // Chat endpoint
    app.post('/api/chat', async (req, res) => {
      try {
        const { message, sessionId, userId, context } = req.body;
        
        const response = await this.orchestrator.process(
          message,
          sessionId,
          userId,
          context
        );
        
        res.json({
          success: true,
          data: {
            message: response.content,
            confidence: response.confidence,
            transformationValue: response.transformationValue,
            nextActions: response.nextActions
          }
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: error.message
        });
      }
    });

    // Agent capabilities endpoint
    app.get('/api/agents', (req, res) => {
      const agents = this.orchestrator.getAvailableAgents();
      res.json({ success: true, data: agents });
    });

    // Health check
    app.get('/api/health', async (req, res) => {
      const health = await this.orchestrator.getSystemHealth();
      res.json({ success: true, data: health });
    });
  }
}

// =============================================================================
// 5. WHATSAPP BUSINESS API INTEGRATION
// =============================================================================

class WhatsAppAIBot {
  constructor(client) {
    this.client = client;
    this.orchestrator = null;
    this.plugin = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
    this.plugin = this.orchestrator.createChatbotPlugin();
    
    this.client.on('message', this.handleMessage.bind(this));
  }

  async handleMessage(message) {
    if (message.body.startsWith('!ai')) {
      const sessionId = `whatsapp-${message.from}`;
      const userId = message.from;
      const query = message.body.slice(3).trim();
      
      const response = await this.plugin.handleMessage(query, sessionId, userId);
      
      await message.reply(response);
    }
  }
}

// =============================================================================
// 6. MICROSOFT TEAMS BOT INTEGRATION
// =============================================================================

class TeamsAIBot {
  constructor() {
    this.orchestrator = null;
    this.plugin = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
    this.plugin = this.orchestrator.createChatbotPlugin();
  }

  async onMessage(context) {
    const sessionId = `teams-${context.activity.conversation.id}`;
    const userId = context.activity.from.id;
    const text = context.activity.text;
    
    const response = await this.plugin.handleMessage(text, sessionId, userId);
    
    await context.sendActivity(response);
  }
}

// =============================================================================
// 7. CUSTOM APPLICATION INTEGRATION
// =============================================================================

class CustomAppIntegration {
  constructor() {
    this.orchestrator = null;
  }

  async initialize() {
    this.orchestrator = await createAIOrchestrator();
  }

  // Method for handling user queries in your app
  async processUserQuery(query, userContext) {
    const sessionId = userContext.sessionId || `app-${userContext.userId}`;
    
    // Build project context from your app's data
    const projectContext = {
      id: userContext.projectId,
      name: userContext.projectName,
      type: userContext.projectType,
      phase: userContext.currentPhase,
      requirements: userContext.requirements || [],
      constraints: userContext.constraints || []
    };

    const response = await this.orchestrator.process(
      query,
      sessionId,
      userContext.userId,
      projectContext
    );

    // You can now use the response in your application
    return {
      answer: response.content,
      confidence: response.confidence,
      transformationValue: response.transformationValue,
      suggestedActions: response.nextActions,
      // Add your custom fields
      timestamp: new Date().toISOString(),
      agentUsed: this.getLastUsedAgent(sessionId)
    };
  }

  // Get user's transformation progress
  async getUserProgress(userId) {
    const health = await this.orchestrator.getSystemHealth();
    // Add your custom progress calculation logic
    return {
      systemHealth: health.overall,
      availableCapabilities: this.orchestrator.getAvailableAgents(),
      // Your custom progress metrics
    };
  }

  getLastUsedAgent(sessionId) {
    // Implementation to track which agent was last used
    // This would require extending the orchestrator
    return 'TechnicalStrategyAgent'; // placeholder
  }
}

// =============================================================================
// EXAMPLE USAGE DEMONSTRATION
// =============================================================================

async function demonstrateIntegrations() {
  console.log('🚀 AI Orchestration Integration Examples\n');

  // 1. Custom Application Example
  console.log('📱 Custom Application Integration:');
  const customApp = new CustomAppIntegration();
  await customApp.initialize();

  const userContext = {
    userId: 'user-123',
    sessionId: 'session-abc',
    projectId: 'project-xyz',
    projectName: 'E-commerce Platform',
    projectType: 'web-application',
    currentPhase: 'planning',
    requirements: ['user authentication', 'product catalog', 'payment processing'],
    constraints: ['budget under $50k', '3-month timeline']
  };

  const result = await customApp.processUserQuery(
    'Help me design the architecture for this e-commerce platform',
    userContext
  );

  console.log('✅ Query processed successfully');
  console.log('📊 Confidence:', result.confidence);
  console.log('🚀 Transformation Value:', result.transformationValue);
  console.log('💡 Suggested Actions:', result.suggestedActions?.length || 0, 'actions');
  console.log('📄 Response Preview:', result.answer.substring(0, 200) + '...\n');

  // 2. Web API Example
  console.log('🌐 Web API Integration:');
  const webAPI = new WebAPIIntegration();
  await webAPI.initialize();

  // Simulate an API request
  const apiResponse = await webAPI.orchestrator.process(
    'Create a user-friendly design system',
    'api-session-123',
    'api-user-456'
  );

  console.log('✅ API request processed');
  console.log('📊 Response length:', apiResponse.content.length, 'characters');
  console.log('🎯 Agent selected successfully\n');

  // 3. System Status
  console.log('📋 System Status:');
  const progress = await customApp.getUserProgress('user-123');
  console.log('🏥 System Health:', progress.systemHealth);
  console.log('🤖 Available Agents:', progress.availableCapabilities.length);
  progress.availableCapabilities.forEach(agent => {
    console.log(`   - ${agent.name}: ${agent.capabilities.length} capabilities`);
  });

  console.log('\n✨ All integration examples completed successfully!');
  console.log('🔧 Ready to integrate into your platform!');
}

// Export classes for use in other files
module.exports = {
  DiscordAIBot,
  SlackAIBot,
  TelegramAIBot,
  WebAPIIntegration,
  WhatsAppAIBot,
  TeamsAIBot,
  CustomAppIntegration,
  demonstrateIntegrations
};

// Run demonstration if this is the main module
if (require.main === module) {
  demonstrateIntegrations().catch(console.error);
}