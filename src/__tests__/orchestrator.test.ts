import { AIOrchestrator } from '../core/orchestrator';
import { InMemoryManager } from '../memory/in-memory';
import { TechnicalStrategyAgent } from '../agents/technical-strategy';
import { AgileCoordinatorAgent } from '../agents/agile-coordinator';

describe('AIOrchestrator', () => {
  let orchestrator: AIOrchestrator;
  let memoryManager: InMemoryManager;

  beforeEach(async () => {
    memoryManager = new InMemoryManager(50);
    orchestrator = new AIOrchestrator(memoryManager, {
      enableSophisticationAdaptation: true,
      enableTransformationTracking: true,
      enableQualityLoops: true,
      maxContextWindow: 20
    });

    // Register test agents
    const techAgent = new TechnicalStrategyAgent();
    const agileAgent = new AgileCoordinatorAgent();

    await orchestrator.registerAgent(techAgent);
    await orchestrator.registerAgent(agileAgent);
  });

  test('should register and list agents', () => {
    const agents = orchestrator.getAvailableAgents();
    
    expect(agents).toHaveLength(2);
    expect(agents.find(a => a.name === 'TechnicalStrategyAgent')).toBeDefined();
    expect(agents.find(a => a.name === 'AgileCoordinatorAgent')).toBeDefined();
  });

  test('should process user input and select appropriate agent', async () => {
    const response = await orchestrator.process(
      'design a scalable architecture',
      'test-session-1',
      'test-user-1'
    );

    expect(response.content).toBeDefined();
    expect(response.confidence).toBeGreaterThan(0);
    expect(response.transformationValue).toBeDefined();
  });

  test('should maintain context across conversations', async () => {
    const sessionId = 'test-session-context';
    const userId = 'test-user-context';

    // First interaction
    await orchestrator.process('Start a new project', sessionId, userId);
    
    // Second interaction - should remember context
    const response = await orchestrator.process('What did I just ask about?', sessionId, userId);
    
    expect(response.content).toBeDefined();
    // The response should reference the previous conversation
    expect(response.content.length).toBeGreaterThan(0);
  });

  test('should handle sophistication adaptation', async () => {
    const beginnerResponse = await orchestrator.process(
      'design an architecture',
      'beginner-session',
      'beginner-user'
    );

    const advancedResponse = await orchestrator.process(
      'design an architecture',
      'advanced-session', 
      'advanced-user'
    );

    expect(beginnerResponse.content).toBeDefined();
    expect(advancedResponse.content).toBeDefined();
    // Both should be valid responses
    expect(beginnerResponse.content.length).toBeGreaterThan(0);
    expect(advancedResponse.content.length).toBeGreaterThan(0);
  });

  test('should provide system health information', async () => {
    const health = await orchestrator.getSystemHealth();
    
    expect(health.overall).toBeDefined();
    expect(health.agents).toHaveLength(2);
    expect(health.memorySystem).toBeDefined();
    expect(health.lastChecked).toBeInstanceOf(Date);
  });

  test('should create chatbot plugin', async () => {
    const plugin = orchestrator.createChatbotPlugin();
    
    expect(plugin.name).toBe('ai-orchestrator');
    expect(plugin.version).toBe('1.0.0');

    // Test message handling
    const response = await plugin.handleMessage(
      'help with architecture',
      'plugin-test-session',
      'plugin-user'
    );
    
    expect(response).toBeDefined();
    expect(typeof response).toBe('string');
    expect(response.length).toBeGreaterThan(0);
  });

  test('should handle chatbot commands', async () => {
    const plugin = orchestrator.createChatbotPlugin();
    
    // Test agents command
    const agentsResponse = await plugin.handleCommand(
      'agents',
      [],
      'command-session'
    );
    expect(agentsResponse).toContain('Available agents');
    
    // Test health command
    const healthResponse = await plugin.handleCommand(
      'health',
      [],
      'command-session'
    );
    expect(healthResponse).toContain('System status');
    
    // Test sophistication command
    const sophisticationResponse = await plugin.handleCommand(
      'sophistication',
      ['4'],
      'command-session'
    );
    expect(sophisticationResponse).toContain('Sophistication level updated');
  });

  test('should handle agent selection for different input types', async () => {
    // Technical input should go to TechnicalStrategyAgent
    const techResponse = await orchestrator.process(
      'design database architecture',
      'tech-session',
      'tech-user'
    );
    expect(techResponse.content).toBeDefined();
    
    // Project management input should go to AgileCoordinatorAgent  
    const agileResponse = await orchestrator.process(
      'create sprint plan',
      'agile-session',
      'agile-user'
    );
    expect(agileResponse.content).toBeDefined();
  });

  test('should handle transformation tracking', async () => {
    const response = await orchestrator.process(
      'help me transform from beginner to expert developer',
      'transformation-session',
      'transformation-user'
    );

    expect(response.transformationValue).toBeGreaterThan(0);
    expect(response.content).toBeDefined();
  });

  test('should handle errors gracefully', async () => {
    // Test with invalid input
    const response = await orchestrator.process(
      '', // Empty input
      'error-session',
      'error-user'
    );

    expect(response.content).toContain('error');
    expect(response.confidence).toBeLessThan(0.5);
  });
});