/**
 * Simple chatbot integration example
 * Demonstrates how to integrate the AI Orchestration system into a chatbot
 */

const { createAIOrchestrator } = require('../dist/index.js');

class SimpleChatbot {
  constructor() {
    this.orchestrator = null;
    this.plugin = null;
  }

  async initialize() {
    console.log('🤖 Initializing Simple Chatbot...');
    this.orchestrator = await createAIOrchestrator();
    this.plugin = this.orchestrator.createChatbotPlugin();
    console.log('✅ Chatbot ready!');
    console.log('📋 Available agents:', this.orchestrator.getAvailableAgents().map(a => a.name).join(', '));
  }

  async handleMessage(userId, message) {
    const sessionId = `session-${userId}`;
    
    // Check if it's a command
    if (message.startsWith('/')) {
      const [command, ...args] = message.slice(1).split(' ');
      return await this.plugin.handleCommand(command, args, sessionId);
    }
    
    // Regular message processing
    return await this.plugin.handleMessage(message, sessionId, userId);
  }

  async demonstrateCapabilities() {
    console.log('\n🎯 Demonstrating AI Orchestration Capabilities\n');

    const testScenarios = [
      {
        user: 'beginner-developer',
        message: 'I need help designing my first web application architecture',
        description: '👶 Beginner Developer Scenario'
      },
      {
        user: 'experienced-architect',
        message: 'Design a microservices architecture with event sourcing and CQRS patterns',
        description: '🏗️ Experienced Architect Scenario'
      },
      {
        user: 'project-manager',
        message: 'Help me create a sprint plan for our AI project with 5 developers',
        description: '📋 Project Manager Scenario'
      },
      {
        user: 'startup-founder',
        message: 'I need to plan the technical roadmap for my SaaS startup',
        description: '🚀 Startup Founder Scenario'
      }
    ];

    for (const scenario of testScenarios) {
      console.log(`${scenario.description}`);
      console.log(`💬 User: "${scenario.message}"\n`);
      
      const response = await this.handleMessage(scenario.user, scenario.message);
      console.log(`🤖 AI Assistant: ${response.substring(0, 300)}${response.length > 300 ? '...' : ''}\n`);
      console.log('─'.repeat(80) + '\n');
    }

    // Test commands
    console.log('🔧 Testing Commands\n');
    
    const commands = [
      { cmd: '/agents', desc: 'List available agents' },
      { cmd: '/health', desc: 'Check system health' },
      { cmd: '/sophistication 5', desc: 'Set user sophistication to expert level' }
    ];

    for (const { cmd, desc } of commands) {
      console.log(`💻 Command: ${cmd} (${desc})`);
      const response = await this.handleMessage('test-user', cmd);
      console.log(`🤖 Response: ${response}\n`);
    }
  }

  async getSystemStatus() {
    const health = await this.orchestrator.getSystemHealth();
    return {
      status: health.overall,
      agents: health.agents.length,
      agentDetails: health.agents.map(a => ({
        name: a.name,
        status: a.health.status,
        capabilities: this.orchestrator.getAvailableAgents()
          .find(agent => agent.name === a.name)?.capabilities || []
      }))
    };
  }
}

// Main demonstration
async function main() {
  try {
    const chatbot = new SimpleChatbot();
    await chatbot.initialize();
    
    await chatbot.demonstrateCapabilities();
    
    console.log('📊 Final System Status:');
    const status = await chatbot.getSystemStatus();
    console.log(JSON.stringify(status, null, 2));
    
    console.log('\n✨ Demo completed! The AI Orchestration system is ready for integration.');
    
  } catch (error) {
    console.error('❌ Demo failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = SimpleChatbot;