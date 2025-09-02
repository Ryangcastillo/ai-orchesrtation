import { TechnicalStrategyAgent } from '../agents/technical-strategy';
import { AgentContext } from '../types';

describe('TechnicalStrategyAgent', () => {
  let agent: TechnicalStrategyAgent;
  let mockContext: AgentContext;

  beforeEach(async () => {
    agent = new TechnicalStrategyAgent();
    await agent.initialize({
      sophisticationAdaptation: true,
      transformationFocus: true,
      marketAdaptation: true,
      qualityLoops: true
    });

    mockContext = {
      sessionId: 'test-session',
      userId: 'test-user',
      conversationHistory: [],
      userProfile: {
        id: 'test-user',
        preferences: {},
        sophisticationLevel: 3,
        transformationJourney: {
          stage: 'solution_aware',
          progression: 50,
          ahamoments: []
        }
      },
      sophisticationLevel: 3,
      transformationGoals: [
        {
          id: 'goal1',
          description: 'Build scalable architecture',
          currentState: 'monolithic app',
          desiredState: 'microservices',
          progress: 30,
          milestones: []
        }
      ]
    };
  });

  afterEach(async () => {
    await agent.cleanup();
  });

  test('should handle architecture-related inputs', () => {
    expect(agent.canHandle('design a scalable architecture', mockContext)).toBe(true);
    expect(agent.canHandle('help with system design', mockContext)).toBe(true);
    expect(agent.canHandle('what is the weather?', mockContext)).toBe(false);
  });

  test('should process architecture requests', async () => {
    const response = await agent.process('design a scalable architecture', mockContext);
    
    expect(response.content).toContain('Architecture');
    expect(response.confidence).toBeGreaterThan(0.5);
    expect(response.transformationValue).toBeGreaterThan(0);
    expect(response.nextActions).toBeDefined();
    expect(response.nextActions!.length).toBeGreaterThan(0);
  });

  test('should adapt to user sophistication level', async () => {
    // Test with beginner level
    const beginnerContext = {
      ...mockContext,
      sophisticationLevel: 1,
      userProfile: {
        ...mockContext.userProfile,
        sophisticationLevel: 1
      }
    };

    const beginnerResponse = await agent.process('design an architecture', beginnerContext);
    expect(beginnerResponse.content.toLowerCase()).toContain('simple');

    // Test with advanced level
    const advancedContext = {
      ...mockContext,
      sophisticationLevel: 5,
      userProfile: {
        ...mockContext.userProfile,
        sophisticationLevel: 5
      }
    };

    const advancedResponse = await agent.process('design an architecture', advancedContext);
    expect(advancedResponse.content.toLowerCase()).toContain('microservices');
  });

  test('should track transformation goals', async () => {
    const response = await agent.process('help with microservices architecture', mockContext);
    
    // Should reference the transformation goal
    expect(response.content.toLowerCase()).toContain('scalable');
    expect(response.transformationValue).toBeGreaterThan(0.5);
  });

  test('should provide database design recommendations', async () => {
    const response = await agent.process('design a database architecture', mockContext);
    
    expect(response.content).toContain('Database');
    expect(response.content).toContain('CREATE TABLE');
    expect(response.confidence).toBeGreaterThan(0.7);
  });

  test('should handle modular design requests', async () => {
    const response = await agent.process('create a modular plugin architecture', mockContext);
    
    expect(response.content).toContain('Plugin');
    expect(response.content).toContain('modular');
    expect(response.content).toContain('interface');
  });

  test('should maintain health status', () => {
    const health = agent.getHealth();
    
    expect(health.status).toBe('healthy');
    expect(health.lastChecked).toBeInstanceOf(Date);
    expect(health.metrics).toBeDefined();
    expect(health.errors).toBeDefined();
    expect(health.errors!.length).toBe(0);
  });
});