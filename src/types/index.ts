export interface AgentContext {
  userId?: string;
  sessionId: string;
  conversationHistory: ConversationMessage[];
  userProfile: UserProfile;
  projectContext?: ProjectContext;
  sophisticationLevel: number; // 1-5 scale
  transformationGoals: TransformationGoal[];
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  preferences: Record<string, any>;
  sophisticationLevel: number;
  culturalContext?: string;
  demographics?: Record<string, any>;
  transformationJourney: TransformationJourney;
}

export interface TransformationGoal {
  id: string;
  description: string;
  currentState: string;
  desiredState: string;
  progress: number; // 0-100
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

export interface TransformationJourney {
  stage: 'unaware' | 'problem_aware' | 'solution_aware' | 'product_aware' | 'most_aware';
  progression: number; // 0-100
  ahamoments: AhaMoment[];
}

export interface AhaMoment {
  id: string;
  description: string;
  timestamp: Date;
  impact: number; // 1-10
}

export interface ProjectContext {
  id: string;
  name: string;
  type: string;
  phase: string;
  requirements: string[];
  constraints: string[];
  stakeholders: string[];
}

export interface AgentResponse {
  content: string;
  confidence: number; // 0-1
  transformationValue: number; // How much this response advances user transformation
  nextActions?: string[];
  metadata?: Record<string, any>;
}

export interface PluginContext {
  name: string;
  version: string;
  config: Record<string, any>;
  dependencies: string[];
}