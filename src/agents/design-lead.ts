import { BaseAgent } from '../core/base-agent';
import { AgentContext, AgentResponse } from '../types';

/**
 * User-Centric Design Lead Agent
 * Specializes in UI/UX design with market taste adaptation and transformation focus
 */
export class DesignLeadAgent extends BaseAgent {
  constructor() {
    super(
      'DesignLeadAgent',
      '1.0.0',
      [
        'ui_ux_design',
        'user_experience',
        'design_systems',
        'transformation_focused_design',
        'market_adaptation',
        'visual_design',
        'user_research',
        'prototyping'
      ],
      ['design_tools', 'user_analytics']
    );
  }

  public canHandle(input: string, context: AgentContext): boolean {
    const designKeywords = [
      'design', 'ui', 'ux', 'user interface', 'user experience',
      'mockup', 'prototype', 'wireframe', 'visual', 'layout',
      'user journey', 'persona', 'usability', 'accessibility',
      'branding', 'style guide', 'component', 'responsive'
    ];

    const inputLower = input.toLowerCase();
    return designKeywords.some(keyword => inputLower.includes(keyword));
  }

  protected async onInitialize(): Promise<void> {
    console.log(`${this.name} initialized with transformation-focused design capabilities`);
  }

  protected async processCore(input: string, context: AgentContext): Promise<AgentResponse> {
    let response = '';
    const confidence = 0.88;

    if (input.toLowerCase().includes('design system')) {
      response = await this.generateDesignSystem(input, context);
    } else if (input.toLowerCase().includes('user journey') || input.toLowerCase().includes('persona')) {
      response = await this.generateUserJourney(input, context);
    } else if (input.toLowerCase().includes('prototype') || input.toLowerCase().includes('wireframe')) {
      response = await this.generatePrototype(input, context);
    } else {
      response = await this.generateDesignStrategy(input, context);
    }

    return {
      content: response,
      confidence,
      transformationValue: 0.75,
      nextActions: [
        'Validate design with user testing',
        'Ensure transformation focus in UI elements',
        'Adapt design complexity to user sophistication'
      ]
    };
  }

  protected async onCleanup(): Promise<void> {
    console.log(`${this.name} cleanup completed`);
  }

  private async generateDesignSystem(input: string, context: AgentContext): Promise<string> {
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    let design = `## Transformation-Focused Design System\n\n`;

    // Adapt design complexity based on user sophistication
    if (sophisticationLevel <= 2) {
      design += `### Simple & Accessible Design Framework\n`;
      design += `**Core Principles**: Clarity, simplicity, and user confidence building\n\n`;
      design += `**Color Palette**:\n`;
      design += `- Primary: Trust Blue (#2563EB) - builds confidence\n`;
      design += `- Success: Growth Green (#10B981) - celebrates progress\n`;
      design += `- Warning: Gentle Orange (#F59E0B) - guides attention\n`;
      design += `- Background: Clean White (#FFFFFF) - reduces overwhelm\n\n`;
      design += `**Typography**:\n`;
      design += `- Headings: Clear, readable sans-serif (Inter, Roboto)\n`;
      design += `- Body: Comfortable reading size (16px minimum)\n`;
      design += `- Focus on scannable content with bullet points\n\n`;
    } else {
      design += `### Advanced Modular Design System\n`;
      design += `**Design Tokens Architecture**:\n\n`;
      design += `\`\`\`css\n`;
      design += `/* Transformation-focused color semantics */\n`;
      design += `--color-transformation-start: #EF4444; /* Current state */\n`;
      design += `--color-transformation-progress: #F59E0B; /* Journey */\n`;
      design += `--color-transformation-achievement: #10B981; /* Goal reached */\n`;
      design += `--color-sophistication-beginner: #E5E7EB;\n`;
      design += `--color-sophistication-expert: #374151;\n`;
      design += `\`\`\`\n\n`;
      design += `**Component Architecture**:\n`;
      design += `- Atomic Design methodology with transformation states\n`;
      design += `- Progressive disclosure based on user sophistication\n`;
      design += `- Context-aware micro-interactions\n`;
      design += `- Accessibility-first approach (WCAG 2.1 AA)\n\n`;
    }

    // Add transformation-focused elements
    design += `### Transformation UI Components\n\n`;
    for (const goal of context.transformationGoals) {
      design += `#### Progress Tracker for "${goal.description}"\n`;
      design += `- **Current State Visual**: Represents "${goal.currentState}"\n`;
      design += `- **Progress Bar**: ${goal.progress}% completion with milestone markers\n`;
      design += `- **Next Step Highlight**: Clear visual cue for next action\n`;
      design += `- **Achievement Celebration**: Micro-animation for milestone completion\n\n`;
    }

    design += `### Market-Adaptive Elements\n`;
    const stage = context.userProfile.transformationJourney.stage;
    switch (stage) {
      case 'unaware':
        design += `- **Discovery UI**: Question prompts, exploration guides\n`;
        design += `- **Educational Tooltips**: Contextual learning moments\n`;
        break;
      case 'problem_aware':
        design += `- **Problem Definition Tools**: Visual problem-solution mapping\n`;
        design += `- **Comparison Frameworks**: Side-by-side option evaluation\n`;
        break;
      case 'solution_aware':
        design += `- **Feature Comparison Matrix**: Detailed capability breakdown\n`;
        design += `- **Proof Displays**: Testimonials, case studies, metrics\n`;
        break;
      case 'product_aware':
        design += `- **Trial Interface**: Hands-on experience components\n`;
        design += `- **Onboarding Flow**: Step-by-step capability introduction\n`;
        break;
      case 'most_aware':
        design += `- **Power User Controls**: Advanced configuration options\n`;
        design += `- **Customization Panel**: Personal workflow optimization\n`;
        break;
    }

    design += `\n### Implementation Guidelines\n`;
    design += `1. **Mobile-First**: Design for transformation on any device\n`;
    design += `2. **Progressive Enhancement**: Layer sophistication as users grow\n`;
    design += `3. **Feedback Loops**: Visual confirmation of every user action\n`;
    design += `4. **Transformation Visualization**: Make progress tangible and rewarding\n`;

    return design;
  }

  private async generateUserJourney(input: string, context: AgentContext): Promise<string> {
    let journey = `## User Transformation Journey Design\n\n`;

    journey += `### User Persona Analysis\n`;
    journey += `**Sophistication Level**: ${context.userProfile.sophisticationLevel}/5\n`;
    journey += `**Current Journey Stage**: ${context.userProfile.transformationJourney.stage}\n`;
    journey += `**Cultural Context**: ${context.userProfile.culturalContext || 'Global'}\n\n`;

    journey += `### Transformation Journey Map\n\n`;
    for (let i = 0; i < context.transformationGoals.length; i++) {
      const goal = context.transformationGoals[i];
      journey += `#### Journey ${i + 1}: ${goal.description}\n`;
      journey += `\`\`\`\n`;
      journey += `${goal.currentState} ➜ [${goal.progress}% Progress] ➜ ${goal.desiredState}\n`;
      journey += `\`\`\`\n\n`;

      journey += `**UI Flow Design**:\n`;
      journey += `1. **Entry Point**: Visual representation of current state\n`;
      journey += `   - Empathetic messaging: "We understand you're at [current state]"\n`;
      journey += `   - Visual: Before state illustration or icon\n\n`;

      journey += `2. **Progress Visualization**:\n`;
      journey += `   - Progress bar with milestone markers\n`;
      journey += `   - Completed milestones highlighted in success color\n`;
      journey += `   - Next milestone prominently displayed\n\n`;

      journey += `3. **Action Interface**:\n`;
      journey += `   - Clear, single primary action per step\n`;
      journey += `   - Secondary actions available but not overwhelming\n`;
      journey += `   - Help resources contextually available\n\n`;

      journey += `4. **Achievement Recognition**:\n`;
      journey += `   - Micro-celebrations for small wins\n`;
      journey += `   - Progress badges and visual rewards\n`;
      journey += `   - Social sharing opportunities (optional)\n\n`;
    }

    journey += `### Interaction Patterns\n\n`;
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    if (sophisticationLevel <= 2) {
      journey += `**Beginner-Friendly Patterns**:\n`;
      journey += `- Guided tutorials with clear next steps\n`;
      journey += `- Confirmation dialogs for important actions\n`;
      journey += `- Help text visible by default\n`;
      journey += `- Simple, single-path flows\n`;
    } else {
      journey += `**Advanced User Patterns**:\n`;
      journey += `- Keyboard shortcuts and power user features\n`;
      journey += `- Bulk actions and advanced controls\n`;
      journey += `- Customizable dashboard and workflow\n`;
      journey += `- Multiple path options and flexibility\n`;
    }

    journey += `\n### Emotional Journey Design\n`;
    journey += `- **Confidence Building**: Every interaction builds user confidence\n`;
    journey += `- **Progress Recognition**: Celebrate every step forward\n`;
    journey += `- **Identity Reinforcement**: Help users see themselves as successful\n`;
    journey += `- **Community Connection**: Optional peer interaction and support\n`;

    return journey;
  }

  private async generatePrototype(input: string, context: AgentContext): Promise<string> {
    let prototype = `## Interactive Prototype Design\n\n`;

    prototype += `### Prototyping Strategy\n`;
    prototype += `**Fidelity Level**: High-fidelity interactive prototype\n`;
    prototype += `**Focus**: Transformation-centered user experience\n`;
    prototype += `**Tools**: Figma with advanced prototyping plugins\n\n`;

    prototype += `### Key Screens & Flows\n\n`;

    // Generate prototype screens based on transformation goals
    for (let i = 0; i < Math.min(context.transformationGoals.length, 3); i++) {
      const goal = context.transformationGoals[i];
      prototype += `#### Screen Set ${i + 1}: ${goal.description}\n\n`;

      prototype += `**1. Current State Assessment**\n`;
      prototype += `- Visual: Current state representation\n`;
      prototype += `- Interactive: Assessment questions or evaluation tools\n`;
      prototype += `- Emotional: Empathetic messaging and support\n`;
      prototype += `- Technical: Progress save and context preservation\n\n`;

      prototype += `**2. Goal Setting Interface**\n`;
      prototype += `- Visual: Desired state visualization\n`;
      prototype += `- Interactive: Goal customization and milestone definition\n`;
      prototype += `- Emotional: Motivation building and vision creation\n`;
      prototype += `- Technical: Goal tracking and reminder setup\n\n`;

      prototype += `**3. Action Dashboard**\n`;
      prototype += `- Visual: Progress overview with completion indicators\n`;
      prototype += `- Interactive: Next step recommendations and resource access\n`;
      prototype += `- Emotional: Achievement celebration and encouragement\n`;
      prototype += `- Technical: Context-aware suggestions and learning adaptation\n\n`;
    }

    prototype += `### Interactive Elements\n\n`;
    prototype += `**Micro-Interactions**:\n`;
    prototype += `- Hover states that preview outcomes\n`;
    prototype += `- Click animations that confirm actions\n`;
    prototype += `- Progress animations that show transformation\n`;
    prototype += `- Loading states that maintain engagement\n\n`;

    prototype += `**Adaptive Interface**:\n`;
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    if (sophisticationLevel <= 2) {
      prototype += `- Simplified navigation with clear labels\n`;
      prototype += `- Step-by-step guided flows\n`;
      prototype += `- Prominent help and support options\n`;
      prototype += `- Single-action focus per screen\n`;
    } else {
      prototype += `- Advanced navigation with shortcuts\n`;
      prototype += `- Multi-tasking capable interface\n`;
      prototype += `- Customizable layout and controls\n`;
      prototype += `- Bulk operations and advanced features\n`;
    }

    prototype += `\n### Testing Plan\n`;
    prototype += `1. **User Testing Sessions**: 5-8 users per sophistication level\n`;
    prototype += `2. **A/B Testing**: Compare transformation-focused vs. feature-focused designs\n`;
    prototype += `3. **Analytics Integration**: Track user progression and drop-off points\n`;
    prototype += `4. **Feedback Loops**: Continuous improvement based on user behavior\n\n`;

    prototype += `### Implementation Notes\n`;
    prototype += `- **Responsive Design**: Mobile-first approach with tablet and desktop optimization\n`;
    prototype += `- **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation\n`;
    prototype += `- **Performance**: Optimized loading with progressive enhancement\n`;
    prototype += `- **Integration**: API-ready design with clear data requirements\n`;

    return prototype;
  }

  private async generateDesignStrategy(input: string, context: AgentContext): Promise<string> {
    let strategy = `## User-Centric Design Strategy\n\n`;

    const sophisticationLevel = context.userProfile.sophisticationLevel;
    const transformationGoals = context.transformationGoals;

    strategy += `### Design Philosophy\n`;
    strategy += `**Core Principle**: Users buy transformation, not features\n`;
    strategy += `**Design Goal**: Enable users to become who they want to be\n`;
    strategy += `**User Context**: Sophistication Level ${sophisticationLevel}/5\n\n`;

    strategy += `### Strategic Design Approach\n\n`;
    if (sophisticationLevel <= 2) {
      strategy += `**Simplicity-First Strategy**:\n`;
      strategy += `- Clear, obvious user interfaces\n`;
      strategy += `- Minimal cognitive load\n`;
      strategy += `- Step-by-step guidance\n`;
      strategy += `- Confidence-building interactions\n`;
      strategy += `- Success state emphasis\n\n`;
    } else if (sophisticationLevel >= 4) {
      strategy += `**Sophistication-Showcasing Strategy**:\n`;
      strategy += `- Advanced interface patterns\n`;
      strategy += `- Technical depth and customization\n`;
      strategy += `- Power user features\n`;
      strategy += `- Identity-aligned design choices\n`;
      strategy += `- Professional-grade aesthetics\n\n`;
    } else {
      strategy += `**Balanced Complexity Strategy**:\n`;
      strategy += `- Progressive disclosure of features\n`;
      strategy += `- Optional advanced controls\n`;
      strategy += `- Adaptable interface complexity\n`;
      strategy += `- Growth-oriented design patterns\n`;
      strategy += `- Flexible user pathways\n\n`;
    }

    strategy += `### Transformation-Focused Design Elements\n\n`;
    for (const goal of transformationGoals) {
      strategy += `#### Design for "${goal.description}"\n`;
      strategy += `- **Visual Metaphor**: Bridge or pathway from "${goal.currentState}" to "${goal.desiredState}"\n`;
      strategy += `- **Progress Indicators**: ${goal.progress}% completion with milestone celebrations\n`;
      strategy += `- **Motivational Elements**: Identity reinforcement and vision alignment\n`;
      strategy += `- **Action Clarity**: Clear next steps and barrier removal\n\n`;
    }

    strategy += `### Market-Adaptive Design Considerations\n`;
    const stage = context.userProfile.transformationJourney.stage;
    strategy += `**Current User Stage**: ${stage}\n\n`;

    switch (stage) {
      case 'unaware':
        strategy += `**Discovery-Focused Design**:\n`;
        strategy += `- Question-prompting interfaces\n`;
        strategy += `- Educational content integration\n`;
        strategy += `- Curiosity-building elements\n`;
        strategy += `- Non-threatening exploration paths\n`;
        break;
      case 'problem_aware':
        strategy += `**Solution-Oriented Design**:\n`;
        strategy += `- Problem visualization tools\n`;
        strategy += `- Solution comparison interfaces\n`;
        strategy += `- Impact demonstration elements\n`;
        strategy += `- Urgency indicators (gentle)\n`;
        break;
      case 'solution_aware':
        strategy += `**Evaluation-Supporting Design**:\n`;
        strategy += `- Feature comparison matrices\n`;
        strategy += `- Proof and testimonial integration\n`;
        strategy += `- Trial and demo interfaces\n`;
        strategy += `- Technical specification displays\n`;
        break;
      case 'product_aware':
        strategy += `**Optimization-Focused Design**:\n`;
        strategy += `- Onboarding excellence\n`;
        strategy += `- Success metric dashboards\n`;
        strategy += `- Performance optimization tools\n`;
        strategy += `- Advanced feature graduation\n`;
        break;
      case 'most_aware':
        strategy += `**Identity-Aligned Design**:\n`;
        strategy += `- Professional-grade interfaces\n`;
        strategy += `- Customization and personalization\n`;
        strategy += `- Community and social features\n`;
        strategy += `- Status and achievement systems\n`;
        break;
    }

    strategy += `\n### Implementation Priorities\n`;
    strategy += `1. **User Research**: Validate transformation goals and pain points\n`;
    strategy += `2. **Design System**: Create consistent, scalable design language\n`;
    strategy += `3. **Prototyping**: Test transformation-focused interactions\n`;
    strategy += `4. **User Testing**: Validate design effectiveness across sophistication levels\n`;
    strategy += `5. **Iteration**: Continuous improvement based on user feedback and behavior\n\n`;

    strategy += `### Success Metrics\n`;
    strategy += `- **Transformation Progress**: Measurable advancement toward user goals\n`;
    strategy += `- **User Confidence**: Increased self-efficacy and reduced anxiety\n`;
    strategy += `- **Engagement Quality**: Deep, meaningful interactions vs. surface metrics\n`;
    strategy += `- **Identity Alignment**: User identification with desired future self\n`;

    return strategy;
  }
}