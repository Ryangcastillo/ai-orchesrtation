import { BaseAgent } from '../core/base-agent';
import { AgentContext, AgentResponse } from '../types';

/**
 * Agile Project Coordinator Agent
 * Manages project setup, sprint planning, and agile processes with transformation focus
 */
export class AgileCoordinatorAgent extends BaseAgent {
  constructor() {
    super(
      'AgileCoordinatorAgent',
      '1.0.0',
      [
        'project_management',
        'agile_planning',
        'sprint_coordination',
        'transformation_tracking',
        'workflow_optimization',
        'context_management'
      ],
      ['memory_manager', 'task_tracker']
    );
  }

  public canHandle(input: string, context: AgentContext): boolean {
    const projectKeywords = [
      'project', 'sprint', 'agile', 'scrum', 'planning',
      'workflow', 'task', 'epic', 'user story',
      'milestone', 'timeline', 'coordination'
    ];

    const inputLower = input.toLowerCase();
    return projectKeywords.some(keyword => inputLower.includes(keyword));
  }

  protected async onInitialize(): Promise<void> {
    console.log(`${this.name} initialized with transformation-focused project management`);
  }

  protected async processCore(input: string, context: AgentContext): Promise<AgentResponse> {
    let response = '';
    const confidence = 0.9;

    if (input.toLowerCase().includes('sprint') || input.toLowerCase().includes('planning')) {
      response = await this.generateSprintPlan(input, context);
    } else if (input.toLowerCase().includes('user story') || input.toLowerCase().includes('epic')) {
      response = await this.generateUserStories(input, context);
    } else if (input.toLowerCase().includes('workflow')) {
      response = await this.generateWorkflow(input, context);
    } else {
      response = await this.generateProjectPlan(input, context);
    }

    return {
      content: response,
      confidence,
      transformationValue: 0.8,
      nextActions: [
        'Break down tasks into transformation-focused user stories',
        'Set up context management for project continuity',
        'Implement feedback loops for continuous improvement'
      ]
    };
  }

  protected async onCleanup(): Promise<void> {
    console.log(`${this.name} cleanup completed`);
  }

  private async generateSprintPlan(input: string, context: AgentContext): Promise<string> {
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    const transformationGoals = context.transformationGoals;

    let plan = `## Transformation-Centered Sprint Plan\n\n`;

    plan += `### Sprint Overview\n`;
    plan += `**Duration**: 2 weeks\n`;
    plan += `**Sophistication Level**: ${sophisticationLevel}/5\n`;
    plan += `**Primary Transformation Goal**: ${transformationGoals[0]?.description || 'User growth and development'}\n\n`;

    plan += `### User Stories (Transformation-Focused)\n`;
    for (let i = 0; i < Math.min(transformationGoals.length, 3); i++) {
      const goal = transformationGoals[i];
      plan += `#### Epic ${i + 1}: ${goal.description}\n`;
      plan += `**Current State**: ${goal.currentState}\n`;
      plan += `**Desired State**: ${goal.desiredState}\n`;
      plan += `**Progress**: ${goal.progress}%\n\n`;

      plan += `**User Stories**:\n`;
      plan += `- As a user transforming from "${goal.currentState}" to "${goal.desiredState}", I want to see clear progress indicators\n`;
      plan += `- As a user, I want personalized guidance that matches my sophistication level (${sophisticationLevel}/5)\n`;
      plan += `- As a user, I want the system to remember my journey and build on previous interactions\n\n`;
    }

    plan += `### Sprint Deliverables by User Journey Stage\n`;
    const stage = context.userProfile.transformationJourney.stage;
    
    switch (stage) {
      case 'unaware':
        plan += `**Discovery & Education Features**:\n`;
        plan += `- [ ] Problem identification tools\n`;
        plan += `- [ ] Educational content delivery\n`;
        plan += `- [ ] Awareness-building interactions\n`;
        break;
      case 'problem_aware':
        plan += `**Solution Exploration Features**:\n`;
        plan += `- [ ] Problem definition tools\n`;
        plan += `- [ ] Solution comparison framework\n`;
        plan += `- [ ] Impact visualization\n`;
        break;
      case 'solution_aware':
        plan += `**Evaluation & Comparison Features**:\n`;
        plan += `- [ ] Feature comparison tools\n`;
        plan += `- [ ] Proof of concept demonstrations\n`;
        plan += `- [ ] Technical evaluation criteria\n`;
        break;
      case 'product_aware':
        plan += `**Trial & Onboarding Features**:\n`;
        plan += `- [ ] Hands-on trial experiences\n`;
        plan += `- [ ] Onboarding optimization\n`;
        plan += `- [ ] Success metrics tracking\n`;
        break;
      case 'most_aware':
        plan += `**Advanced Functionality & Optimization**:\n`;
        plan += `- [ ] Power user features\n`;
        plan += `- [ ] Customization options\n`;
        plan += `- [ ] Integration capabilities\n`;
        break;
    }

    plan += `\n### Context Management Tasks\n`;
    plan += `- [ ] Implement conversation context storage\n`;
    plan += `- [ ] Set up automatic context compression\n`;
    plan += `- [ ] Configure semantic search for project history\n`;
    plan += `- [ ] Create context-aware prompt templates\n\n`;

    plan += `### Quality Gates\n`;
    plan += `- [ ] Transformation progress measurement\n`;
    plan += `- [ ] User satisfaction validation (sophistication-appropriate)\n`;
    plan += `- [ ] Context continuity testing\n`;
    plan += `- [ ] Performance benchmarking\n\n`;

    plan += `### Definition of Done\n`;
    plan += `Each story is complete when:\n`;
    plan += `✅ Advances user transformation measurably\n`;
    plan += `✅ Adapts to user sophistication level\n`;
    plan += `✅ Preserves and builds on context\n`;
    plan += `✅ Passes automated quality checks\n`;
    plan += `✅ Demonstrates proof > promise principle\n`;

    return plan;
  }

  private async generateUserStories(input: string, context: AgentContext): Promise<string> {
    const transformationGoals = context.transformationGoals;
    const sophisticationLevel = context.userProfile.sophisticationLevel;

    let stories = `## Transformation-Focused User Stories\n\n`;

    stories += `### Story Template Framework\n`;
    stories += `Instead of: "As a user, I want X"\n`;
    stories += `Use: "As a user transforming from [current state] to [desired state], I want X so that I can become [identity goal]"\n\n`;

    stories += `### Generated User Stories\n\n`;

    for (let i = 0; i < transformationGoals.length; i++) {
      const goal = transformationGoals[i];
      stories += `#### Epic ${i + 1}: ${goal.description}\n\n`;

      // Generate stories based on sophistication level
      if (sophisticationLevel <= 2) {
        stories += `**Beginner-Friendly Stories**:\n\n`;
        stories += `📝 **Story 1**: Basic Progress Tracking\n`;
        stories += `As a user transforming from "${goal.currentState}" to "${goal.desiredState}",\n`;
        stories += `I want simple progress indicators\n`;
        stories += `So that I can see I'm moving forward without confusion.\n\n`;

        stories += `**Acceptance Criteria**:\n`;
        stories += `- [ ] Progress bar shows completion percentage\n`;
        stories += `- [ ] Simple, clear language throughout\n`;
        stories += `- [ ] Visual feedback for each step completed\n`;
        stories += `- [ ] Help text available but not overwhelming\n\n`;

        stories += `📝 **Story 2**: Guided Next Steps\n`;
        stories += `As a user new to this transformation journey,\n`;
        stories += `I want clear next steps suggested automatically\n`;
        stories += `So that I never feel lost or overwhelmed.\n\n`;

        stories += `**Acceptance Criteria**:\n`;
        stories += `- [ ] System suggests one clear next action\n`;
        stories += `- [ ] Explanations use everyday language\n`;
        stories += `- [ ] Examples provided for complex concepts\n`;
        stories += `- [ ] Safety net: easy way to get help\n\n`;

      } else if (sophisticationLevel >= 4) {
        stories += `**Advanced User Stories**:\n\n`;
        stories += `📝 **Story 1**: Sophisticated Progress Analytics\n`;
        stories += `As an advanced user transforming from "${goal.currentState}" to "${goal.desiredState}",\n`;
        stories += `I want detailed analytics and insights into my transformation journey\n`;
        stories += `So that I can optimize my approach and demonstrate technical sophistication.\n\n`;

        stories += `**Acceptance Criteria**:\n`;
        stories += `- [ ] Detailed metrics dashboard\n`;
        stories += `- [ ] Historical trend analysis\n`;
        stories += `- [ ] Comparative benchmarks\n`;
        stories += `- [ ] Export capabilities for external analysis\n`;
        stories += `- [ ] API access for custom integrations\n\n`;

        stories += `📝 **Story 2**: Customizable Workflow Engine\n`;
        stories += `As a power user who understands system mechanics,\n`;
        stories += `I want to customize and optimize my transformation workflow\n`;
        stories += `So that I can achieve better results through personalization.\n\n`;

        stories += `**Acceptance Criteria**:\n`;
        stories += `- [ ] Workflow editor with drag-and-drop interface\n`;
        stories += `- [ ] Custom rule creation\n`;
        stories += `- [ ] Integration with external tools\n`;
        stories += `- [ ] A/B testing of different approaches\n`;
        stories += `- [ ] Performance optimization recommendations\n\n`;

      } else {
        stories += `**Balanced Complexity Stories**:\n\n`;
        stories += `📝 **Story 1**: Smart Progress Tracking\n`;
        stories += `As a user with moderate experience transforming from "${goal.currentState}" to "${goal.desiredState}",\n`;
        stories += `I want intelligent progress tracking that adapts to my learning pace\n`;
        stories += `So that I stay engaged without being overwhelmed or under-challenged.\n\n`;

        stories += `**Acceptance Criteria**:\n`;
        stories += `- [ ] Adaptive difficulty based on progress\n`;
        stories += `- [ ] Multiple progress visualization options\n`;
        stories += `- [ ] Contextual help when needed\n`;
        stories += `- [ ] Achievement celebrations\n`;
        stories += `- [ ] Peer comparison (optional)\n\n`;
      }

      stories += `---\n\n`;
    }

    stories += `### Context Continuity Stories\n\n`;
    stories += `📝 **Story**: Conversation Memory\n`;
    stories += `As a user with ongoing transformation goals,\n`;
    stories += `I want the system to remember our previous conversations\n`;
    stories += `So that I don't have to repeat context and can build on previous discussions.\n\n`;

    stories += `**Acceptance Criteria**:\n`;
    stories += `- [ ] System recalls previous 30 messages\n`;
    stories += `- [ ] Compressed summaries for longer histories\n`;
    stories += `- [ ] Semantic search across conversation history\n`;
    stories += `- [ ] Context-aware suggestions\n`;
    stories += `- [ ] Privacy controls for data retention\n\n`;

    return stories;
  }

  private async generateWorkflow(input: string, context: AgentContext): Promise<string> {
    let workflow = `## Modular Workflow Design\n\n`;

    workflow += `### Plugin-Based Pipeline Architecture\n`;
    workflow += `\`\`\`yaml\n`;
    workflow += `# Workflow Configuration\n`;
    workflow += `name: "Transformation-Focused Development"\n`;
    workflow += `version: "1.0"\n`;
    workflow += `\n`;
    workflow += `stages:\n`;
    workflow += `  - name: "Context Loading"\n`;
    workflow += `    plugins:\n`;
    workflow += `      - memory-manager\n`;
    workflow += `      - user-profiler\n`;
    workflow += `      - context-builder\n`;
    workflow += `  \n`;
    workflow += `  - name: "Sophistication Adaptation"\n`;
    workflow += `    plugins:\n`;
    workflow += `      - complexity-adapter\n`;
    workflow += `      - language-matcher\n`;
    workflow += `      - cultural-adapter\n`;
    workflow += `  \n`;
    workflow += `  - name: "Agent Processing"\n`;
    workflow += `    plugins:\n`;
    workflow += `      - agent-selector\n`;
    workflow += `      - transformation-tracker\n`;
    workflow += `      - quality-validator\n`;
    workflow += `  \n`;
    workflow += `  - name: "Response Enhancement"\n`;
    workflow += `    plugins:\n`;
    workflow += `      - proof-integrator\n`;
    workflow += `      - action-suggester\n`;
    workflow += `      - feedback-collector\n`;
    workflow += `\`\`\`\n\n`;

    workflow += `### CI/CD Integration\n`;
    workflow += `\`\`\`yaml\n`;
    workflow += `# .github/workflows/ai-agent-pipeline.yml\n`;
    workflow += `name: AI Agent Quality Pipeline\n`;
    workflow += `on: [push, pull_request]\n`;
    workflow += `\n`;
    workflow += `jobs:\n`;
    workflow += `  test:\n`;
    workflow += `    runs-on: ubuntu-latest\n`;
    workflow += `    steps:\n`;
    workflow += `      - uses: actions/checkout@v4\n`;
    workflow += `      - uses: actions/setup-node@v4\n`;
    workflow += `      - run: npm ci\n`;
    workflow += `      - run: npm run lint\n`;
    workflow += `      - run: npm run test\n`;
    workflow += `      - run: npm run test:transformation\n`;
    workflow += `  \n`;
    workflow += `  quality-gates:\n`;
    workflow += `    needs: test\n`;
    workflow += `    runs-on: ubuntu-latest\n`;
    workflow += `    steps:\n`;
    workflow += `      - run: npm run test:sophistication-adaptation\n`;
    workflow += `      - run: npm run test:context-continuity\n`;
    workflow += `      - run: npm run test:plugin-compatibility\n`;
    workflow += `\`\`\`\n\n`;

    workflow += `### State Management Workflow\n`;
    workflow += `1. **Context Loading**: Retrieve user profile and conversation history\n`;
    workflow += `2. **Sophistication Assessment**: Determine current user level and adapt complexity\n`;
    workflow += `3. **Agent Selection**: Choose appropriate agent based on request type\n`;
    workflow += `4. **Processing**: Execute agent logic with transformation focus\n`;
    workflow += `5. **Quality Validation**: Ensure response meets transformation criteria\n`;
    workflow += `6. **Context Storage**: Update conversation history and user profile\n`;
    workflow += `7. **Feedback Loop**: Collect implicit/explicit feedback for improvement\n\n`;

    workflow += `### Shared Memory Services\n`;
    workflow += `- **Session Store**: Active conversation context\n`;
    workflow += `- **User Profile**: Long-term preferences and progress\n`;
    workflow += `- **Project Context**: Multi-session project state\n`;
    workflow += `- **Knowledge Base**: Semantic search across documentation\n`;

    return workflow;
  }

  private async generateProjectPlan(input: string, context: AgentContext): Promise<string> {
    const transformationGoals = context.transformationGoals;
    const sophisticationLevel = context.userProfile.sophisticationLevel;

    let plan = `## Comprehensive Project Plan\n\n`;

    plan += `### Project Overview\n`;
    plan += `**User Sophistication Level**: ${sophisticationLevel}/5\n`;
    plan += `**Transformation Stage**: ${context.userProfile.transformationJourney.stage}\n`;
    plan += `**Primary Goals**: ${transformationGoals.length} active transformation goals\n\n`;

    plan += `### Phase-Based Approach\n\n`;

    plan += `#### Phase 1: Foundation Setup (Week 1-2)\n`;
    plan += `**Epic 1.1**: Context Management Infrastructure\n`;
    plan += `- Set up vector database for semantic search\n`;
    plan += `- Implement conversation compression\n`;
    plan += `- Create user profile management\n`;
    plan += `- Configure prompt template system\n\n`;

    plan += `**Epic 1.2**: Core Agent Framework\n`;
    plan += `- Implement base agent architecture\n`;
    plan += `- Create plugin registration system\n`;
    plan += `- Set up health monitoring\n`;
    plan += `- Configure quality gates\n\n`;

    plan += `#### Phase 2: Agent Implementation (Week 3-6)\n`;
    plan += `**Epic 2.1**: Specialized Agent Development\n`;
    plan += `- Technical Strategy Agent\n`;
    plan += `- Agile Coordinator Agent\n`;
    plan += `- Design Lead Agent\n`;
    plan += `- Backend Engineer Agent\n\n`;

    plan += `**Epic 2.2**: Sophistication Adaptation\n`;
    plan += `- Implement complexity scaling\n`;
    plan += `- Create cultural adaptation\n`;
    plan += `- Add proof integration\n`;
    plan += `- Build transformation tracking\n\n`;

    plan += `#### Phase 3: Integration & Testing (Week 7-8)\n`;
    plan += `**Epic 3.1**: Plugin System\n`;
    plan += `- Chatbot integration examples\n`;
    plan += `- API documentation\n`;
    plan += `- SDK development\n`;
    plan += `- Integration testing\n\n`;

    plan += `**Epic 3.2**: Quality Assurance\n`;
    plan += `- Automated testing suite\n`;
    plan += `- Performance benchmarking\n`;
    plan += `- Security validation\n`;
    plan += `- Documentation completion\n\n`;

    plan += `### Success Metrics\n`;
    plan += `- **Transformation Progress**: Measurable advancement in user goals\n`;
    plan += `- **Context Continuity**: 95%+ conversation context retention\n`;
    plan += `- **Plugin Compatibility**: Easy integration in <30 minutes\n`;
    plan += `- **User Satisfaction**: Sophistication-appropriate responses 90%+ of time\n`;

    return plan;
  }
}