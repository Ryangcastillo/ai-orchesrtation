import { BaseAgent } from '../core/base-agent';
import { AgentContext, AgentResponse } from '../types';

/**
 * Principal Backend Engineer Agent
 * Specializes in server-side development, API design, and technical architecture
 */
export class BackendEngineerAgent extends BaseAgent {
  constructor() {
    super(
      'BackendEngineerAgent',
      '1.0.0',
      [
        'backend_development',
        'api_design',
        'database_design',
        'server_architecture',
        'authentication',
        'security',
        'performance_optimization',
        'microservices',
        'transformation_enablement'
      ],
      ['database', 'authentication_service', 'memory_manager']
    );
  }

  public canHandle(input: string, context: AgentContext): boolean {
    const backendKeywords = [
      'backend', 'server', 'api', 'database', 'authentication',
      'security', 'performance', 'microservices', 'rest', 'graphql',
      'endpoint', 'middleware', 'validation', 'authorization',
      'scalability', 'caching', 'optimization', 'business logic'
    ];

    const inputLower = input.toLowerCase();
    return backendKeywords.some(keyword => inputLower.includes(keyword));
  }

  protected async onInitialize(): Promise<void> {
    console.log(`${this.name} initialized with transformation-enabling backend capabilities`);
  }

  protected async processCore(input: string, context: AgentContext): Promise<AgentResponse> {
    let response = '';
    const confidence = 0.87;

    if (input.toLowerCase().includes('api')) {
      response = await this.generateAPIDesign(input, context);
    } else if (input.toLowerCase().includes('database')) {
      response = await this.generateDatabaseArchitecture(input, context);
    } else if (input.toLowerCase().includes('authentication') || input.toLowerCase().includes('security')) {
      response = await this.generateSecurityImplementation(input, context);
    } else if (input.toLowerCase().includes('performance') || input.toLowerCase().includes('optimization')) {
      response = await this.generatePerformanceOptimization(input, context);
    } else {
      response = await this.generateBackendStrategy(input, context);
    }

    return {
      content: response,
      confidence,
      transformationValue: 0.72,
      nextActions: [
        'Implement user transformation tracking in backend',
        'Add context-aware API responses',
        'Optimize for user journey progression'
      ]
    };
  }

  protected async onCleanup(): Promise<void> {
    console.log(`${this.name} cleanup completed`);
  }

  private async generateAPIDesign(input: string, context: AgentContext): Promise<string> {
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    let api = `## Transformation-Enabling API Design\n\n`;

    api += `### API Architecture Strategy\n`;
    if (sophisticationLevel <= 2) {
      api += `**Simple RESTful Design**:\n`;
      api += `- Clear, predictable endpoints\n`;
      api += `- Standard HTTP methods (GET, POST, PUT, DELETE)\n`;
      api += `- Consistent response formats\n`;
      api += `- Built-in error handling with helpful messages\n\n`;
    } else {
      api += `**Advanced API Architecture**:\n`;
      api += `- GraphQL with RESTful fallbacks\n`;
      api += `- Microservices with API Gateway\n`;
      api += `- Event-driven architecture\n`;
      api += `- Advanced caching strategies\n\n`;
    }

    api += `### Core API Endpoints\n\n`;
    api += `#### User Transformation APIs\n`;
    api += `\`\`\`typescript\n`;
    api += `// User Profile & Journey Tracking\n`;
    api += `GET /api/users/:userId/profile\n`;
    api += `PUT /api/users/:userId/profile\n`;
    api += `GET /api/users/:userId/journey\n`;
    api += `POST /api/users/:userId/journey/milestones\n\n`;

    api += `// Transformation Goals Management\n`;
    api += `GET /api/users/:userId/goals\n`;
    api += `POST /api/users/:userId/goals\n`;
    api += `PUT /api/users/:userId/goals/:goalId\n`;
    api += `DELETE /api/users/:userId/goals/:goalId\n\n`;

    api += `// Context & Memory APIs\n`;
    api += `GET /api/sessions/:sessionId/context\n`;
    api += `POST /api/sessions/:sessionId/context\n`;
    api += `GET /api/sessions/:sessionId/history\n`;
    api += `POST /api/sessions/:sessionId/compress\n\n`;

    api += `// AI Agent Processing\n`;
    api += `POST /api/agents/process\n`;
    api += `GET /api/agents/available\n`;
    api += `GET /api/agents/:agentId/capabilities\n`;
    api += `\`\`\`\n\n`;

    // Add transformation-focused endpoints
    for (const goal of context.transformationGoals.slice(0, 2)) {
      api += `#### APIs for "${goal.description}"\n`;
      api += `\`\`\`typescript\n`;
      api += `// Progress tracking for this specific goal\n`;
      api += `GET /api/transformations/${goal.id}/progress\n`;
      api += `POST /api/transformations/${goal.id}/milestones\n`;
      api += `GET /api/transformations/${goal.id}/recommendations\n`;
      api += `POST /api/transformations/${goal.id}/feedback\n`;
      api += `\`\`\`\n\n`;
    }

    api += `### API Response Format\n`;
    api += `\`\`\`typescript\n`;
    api += `interface APIResponse<T> {\n`;
    api += `  success: boolean;\n`;
    api += `  data?: T;\n`;
    api += `  error?: {\n`;
    api += `    code: string;\n`;
    api += `    message: string;\n`;
    api += `    details?: any;\n`;
    api += `  };\n`;
    api += `  metadata: {\n`;
    api += `    timestamp: string;\n`;
    api += `    requestId: string;\n`;
    api += `    userSophisticationLevel?: number;\n`;
    api += `    transformationContext?: any;\n`;
    api += `  };\n`;
    api += `}\n`;
    api += `\`\`\`\n\n`;

    api += `### Authentication & Authorization\n`;
    api += `- **JWT-based authentication** with refresh tokens\n`;
    api += `- **Role-based access control** (RBAC)\n`;
    api += `- **API rate limiting** based on user tier\n`;
    api += `- **Request validation** with comprehensive error messages\n\n`;

    api += `### Context-Aware API Behavior\n`;
    const stage = context.userProfile.transformationJourney.stage;
    api += `**Current User Stage: ${stage}**\n`;
    switch (stage) {
      case 'unaware':
        api += `- APIs return educational content and discovery prompts\n`;
        api += `- Simplified response formats\n`;
        api += `- Built-in help and guidance\n`;
        break;
      case 'solution_aware':
        api += `- APIs include comparison data and proof elements\n`;
        api += `- Feature availability based on evaluation needs\n`;
        api += `- Performance metrics and benchmarks\n`;
        break;
      case 'most_aware':
        api += `- APIs expose advanced configuration options\n`;
        api += `- Full feature set availability\n`;
        api += `- Customization and personalization endpoints\n`;
        break;
    }

    return api;
  }

  private async generateDatabaseArchitecture(input: string, context: AgentContext): Promise<string> {
    let db = `## Transformation-Focused Database Architecture\n\n`;

    db += `### Database Strategy\n`;
    db += `**Primary Database**: PostgreSQL with PGVector extension\n`;
    db += `**Caching Layer**: Redis for session management\n`;
    db += `**Search**: Elasticsearch for full-text search\n`;
    db += `**Analytics**: Separate OLAP database (BigQuery/Snowflake)\n\n`;

    db += `### Core Schema Design\n`;
    db += `\`\`\`sql\n`;
    db += `-- User Management & Profiles\n`;
    db += `CREATE TABLE users (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  email VARCHAR(255) UNIQUE NOT NULL,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW(),\n`;
    db += `  updated_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `CREATE TABLE user_profiles (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n`;
    db += `  sophistication_level INTEGER CHECK (sophistication_level BETWEEN 1 AND 5) DEFAULT 3,\n`;
    db += `  cultural_context JSONB,\n`;
    db += `  preferences JSONB,\n`;
    db += `  demographics JSONB,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW(),\n`;
    db += `  updated_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `-- Transformation Goals & Journey\n`;
    db += `CREATE TABLE transformation_goals (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n`;
    db += `  description TEXT NOT NULL,\n`;
    db += `  current_state TEXT NOT NULL,\n`;
    db += `  desired_state TEXT NOT NULL,\n`;
    db += `  progress INTEGER CHECK (progress BETWEEN 0 AND 100) DEFAULT 0,\n`;
    db += `  status VARCHAR(50) DEFAULT 'active',\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW(),\n`;
    db += `  updated_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `CREATE TABLE transformation_milestones (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  goal_id UUID REFERENCES transformation_goals(id) ON DELETE CASCADE,\n`;
    db += `  description TEXT NOT NULL,\n`;
    db += `  completed BOOLEAN DEFAULT FALSE,\n`;
    db += `  completed_at TIMESTAMP,\n`;
    db += `  order_index INTEGER NOT NULL,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `CREATE TABLE transformation_journey (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n`;
    db += `  stage VARCHAR(50) NOT NULL CHECK (stage IN (\n`;
    db += `    'unaware', 'problem_aware', 'solution_aware', 'product_aware', 'most_aware'\n`;
    db += `  )),\n`;
    db += `  progression INTEGER CHECK (progression BETWEEN 0 AND 100) DEFAULT 0,\n`;
    db += `  stage_entered_at TIMESTAMP DEFAULT NOW(),\n`;
    db += `  updated_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `-- Context & Memory Management\n`;
    db += `CREATE TABLE conversation_sessions (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  session_id VARCHAR(255) UNIQUE NOT NULL,\n`;
    db += `  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n`;
    db += `  context JSONB,\n`;
    db += `  context_embedding VECTOR(1536), -- OpenAI embedding dimension\n`;
    db += `  compressed_history TEXT,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW(),\n`;
    db += `  updated_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `CREATE TABLE conversation_messages (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  session_id UUID REFERENCES conversation_sessions(id) ON DELETE CASCADE,\n`;
    db += `  message_id VARCHAR(255) NOT NULL,\n`;
    db += `  role VARCHAR(20) CHECK (role IN ('user', 'assistant', 'system')),\n`;
    db += `  content TEXT NOT NULL,\n`;
    db += `  metadata JSONB,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `-- Agent System\n`;
    db += `CREATE TABLE agent_interactions (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  session_id UUID REFERENCES conversation_sessions(id),\n`;
    db += `  agent_name VARCHAR(100) NOT NULL,\n`;
    db += `  input_text TEXT NOT NULL,\n`;
    db += `  response_text TEXT NOT NULL,\n`;
    db += `  confidence DECIMAL(3,2),\n`;
    db += `  transformation_value DECIMAL(3,2),\n`;
    db += `  processing_time_ms INTEGER,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\n`;

    db += `-- Aha Moments & Insights\n`;
    db += `CREATE TABLE aha_moments (\n`;
    db += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    db += `  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n`;
    db += `  description TEXT NOT NULL,\n`;
    db += `  impact INTEGER CHECK (impact BETWEEN 1 AND 10),\n`;
    db += `  context JSONB,\n`;
    db += `  created_at TIMESTAMP DEFAULT NOW()\n`;
    db += `);\n\`\`\`\n\n`;

    db += `### Indexes for Performance\n`;
    db += `\`\`\`sql\n`;
    db += `-- User and session lookups\n`;
    db += `CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);\n`;
    db += `CREATE INDEX idx_conversation_sessions_session_id ON conversation_sessions(session_id);\n`;
    db += `CREATE INDEX idx_conversation_sessions_user_id ON conversation_sessions(user_id);\n\n`;

    db += `-- Transformation tracking\n`;
    db += `CREATE INDEX idx_transformation_goals_user_id ON transformation_goals(user_id);\n`;
    db += `CREATE INDEX idx_transformation_goals_status ON transformation_goals(status);\n`;
    db += `CREATE INDEX idx_milestones_goal_id ON transformation_milestones(goal_id);\n\n`;

    db += `-- Vector similarity search\n`;
    db += `CREATE INDEX idx_conversation_embedding ON conversation_sessions \n`;
    db += `  USING ivfflat (context_embedding vector_cosine_ops);\n\n`;

    db += `-- Agent analytics\n`;
    db += `CREATE INDEX idx_agent_interactions_session ON agent_interactions(session_id);\n`;
    db += `CREATE INDEX idx_agent_interactions_agent ON agent_interactions(agent_name);\n`;
    db += `CREATE INDEX idx_agent_interactions_created ON agent_interactions(created_at);\n`;
    db += `\`\`\`\n\n`;

    db += `### Data Management Strategies\n`;
    db += `1. **Partitioning**: Partition conversation_messages by created_at (monthly)\n`;
    db += `2. **Archival**: Archive old conversations after 1 year\n`;
    db += `3. **Compression**: Compress old conversation history automatically\n`;
    db += `4. **Replication**: Read replicas for analytics and reporting\n`;
    db += `5. **Backup**: Automated daily backups with point-in-time recovery\n\n`;

    db += `### Privacy & Compliance\n`;
    db += `- **Data Encryption**: At-rest and in-transit encryption\n`;
    db += `- **GDPR Compliance**: User data deletion and export capabilities\n`;
    db += `- **Audit Logging**: All data modifications tracked\n`;
    db += `- **Access Control**: Row-level security policies\n`;

    return db;
  }

  private async generateSecurityImplementation(input: string, context: AgentContext): Promise<string> {
    let security = `## Comprehensive Security Implementation\n\n`;

    security += `### Authentication Strategy\n`;
    security += `**Primary Method**: JWT with refresh token rotation\n`;
    security += `**Secondary**: OAuth 2.0 / OIDC integration (Google, GitHub, etc.)\n`;
    security += `**MFA Support**: TOTP-based two-factor authentication\n\n`;

    security += `### JWT Implementation\n`;
    security += `\`\`\`typescript\n`;
    security += `interface JWTPayload {\n`;
    security += `  userId: string;\n`;
    security += `  email: string;\n`;
    security += `  sophisticationLevel: number;\n`;
    security += `  roles: string[];\n`;
    security += `  permissions: string[];\n`;
    security += `  iat: number;\n`;
    security += `  exp: number;\n`;
    security += `  jti: string; // JWT ID for token tracking\n`;
    security += `}\n\n`;

    security += `// Middleware for JWT validation\n`;
    security += `const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {\n`;
    security += `  try {\n`;
    security += `    const token = req.headers.authorization?.split(' ')[1];\n`;
    security += `    if (!token) throw new Error('No token provided');\n`;
    security += `    \n`;
    security += `    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;\n`;
    security += `    \n`;
    security += `    // Check if token is blacklisted (for logout)\n`;
    security += `    const isBlacklisted = await redis.get(\`blacklist:\${decoded.jti}\`);\n`;
    security += `    if (isBlacklisted) throw new Error('Token is invalidated');\n`;
    security += `    \n`;
    security += `    req.user = decoded;\n`;
    security += `    next();\n`;
    security += `  } catch (error) {\n`;
    security += `    res.status(401).json({ error: 'Invalid or expired token' });\n`;
    security += `  }\n`;
    security += `};\n`;
    security += `\`\`\`\n\n`;

    security += `### Authorization Framework\n`;
    security += `**Model**: Role-Based Access Control (RBAC) with attribute-based extensions\n\n`;
    security += `\`\`\`typescript\n`;
    security += `enum UserRole {\n`;
    security += `  GUEST = 'guest',\n`;
    security += `  USER = 'user',\n`;
    security += `  PREMIUM_USER = 'premium_user',\n`;
    security += `  ADMIN = 'admin',\n`;
    security += `  SUPER_ADMIN = 'super_admin'\n`;
    security += `}\n\n`;

    security += `enum Permission {\n`;
    security += `  READ_PROFILE = 'read:profile',\n`;
    security += `  WRITE_PROFILE = 'write:profile',\n`;
    security += `  READ_GOALS = 'read:goals',\n`;
    security += `  WRITE_GOALS = 'write:goals',\n`;
    security += `  ACCESS_ADVANCED_AGENTS = 'access:advanced_agents',\n`;
    security += `  EXPORT_DATA = 'export:data',\n`;
    security += `  DELETE_ACCOUNT = 'delete:account'\n`;
    security += `}\n\n`;

    security += `const authorize = (requiredPermissions: Permission[]) => {\n`;
    security += `  return (req: Request, res: Response, next: NextFunction) => {\n`;
    security += `    const user = req.user as JWTPayload;\n`;
    security += `    const hasPermission = requiredPermissions.every(permission => \n`;
    security += `      user.permissions.includes(permission)\n`;
    security += `    );\n`;
    security += `    \n`;
    security += `    if (!hasPermission) {\n`;
    security += `      return res.status(403).json({ \n`;
    security += `        error: 'Insufficient permissions',\n`;
    security += `        required: requiredPermissions,\n`;
    security += `        userPermissions: user.permissions\n`;
    security += `      });\n`;
    security += `    }\n`;
    security += `    \n`;
    security += `    next();\n`;
    security += `  };\n`;
    security += `};\n`;
    security += `\`\`\`\n\n`;

    security += `### Input Validation & Sanitization\n`;
    security += `\`\`\`typescript\n`;
    security += `import Joi from 'joi';\n\n`;
    security += `// Transformation goal validation\n`;
    security += `const goalSchema = Joi.object({\n`;
    security += `  description: Joi.string().min(10).max(500).required(),\n`;
    security += `  currentState: Joi.string().min(5).max(200).required(),\n`;
    security += `  desiredState: Joi.string().min(5).max(200).required(),\n`;
    security += `  milestones: Joi.array().items(\n`;
    security += `    Joi.object({\n`;
    security += `      description: Joi.string().min(5).max(200).required(),\n`;
    security += `      completed: Joi.boolean().default(false)\n`;
    security += `    })\n`;
    security += `  ).max(20)\n`;
    security += `});\n\n`;

    security += `// Message content validation (prevent injection)\n`;
    security += `const messageSchema = Joi.object({\n`;
    security += `  content: Joi.string().min(1).max(10000).required(),\n`;
    security += `  sessionId: Joi.string().uuid().required(),\n`;
    security += `  metadata: Joi.object().unknown(true).optional()\n`;
    security += `});\n`;
    security += `\`\`\`\n\n`;

    security += `### Rate Limiting & DDoS Protection\n`;
    security += `\`\`\`typescript\n`;
    security += `import rateLimit from 'express-rate-limit';\n\n`;
    security += `// General API rate limiting\n`;
    security += `const generalLimiter = rateLimit({\n`;
    security += `  windowMs: 15 * 60 * 1000, // 15 minutes\n`;
    security += `  max: 100, // limit each IP to 100 requests per windowMs\n`;
    security += `  message: 'Too many requests from this IP',\n`;
    security += `  standardHeaders: true,\n`;
    security += `  legacyHeaders: false\n`;
    security += `});\n\n`;

    security += `// Strict rate limiting for AI processing\n`;
    security += `const aiProcessingLimiter = rateLimit({\n`;
    security += `  windowMs: 60 * 1000, // 1 minute\n`;
    security += `  max: async (req) => {\n`;
    security += `    const user = req.user as JWTPayload;\n`;
    security += `    // Premium users get higher limits\n`;
    security += `    return user.roles.includes('premium_user') ? 30 : 10;\n`;
    security += `  },\n`;
    security += `  keyGenerator: (req) => req.user?.userId || req.ip\n`;
    security += `});\n`;
    security += `\`\`\`\n\n`;

    security += `### Data Protection & Privacy\n`;
    security += `1. **Encryption at Rest**: AES-256 encryption for sensitive data\n`;
    security += `2. **Encryption in Transit**: TLS 1.3 for all communications\n`;
    security += `3. **PII Handling**: Separate encrypted storage for personally identifiable information\n`;
    security += `4. **Right to Deletion**: Automated data purging workflows\n`;
    security += `5. **Data Export**: Complete user data export in JSON format\n`;
    security += `6. **Audit Logging**: All data access and modifications logged\n\n`;

    security += `### Security Monitoring & Alerting\n`;
    security += `\`\`\`typescript\n`;
    security += `// Security event logging\n`;
    security += `const logSecurityEvent = async (event: {\n`;
    security += `  type: 'login' | 'logout' | 'failed_auth' | 'permission_denied' | 'suspicious_activity';\n`;
    security += `  userId?: string;\n`;
    security += `  ip: string;\n`;
    security += `  userAgent: string;\n`;
    security += `  details?: any;\n`;
    security += `}) => {\n`;
    security += `  await SecurityLog.create({\n`;
    security += `    ...event,\n`;
    security += `    timestamp: new Date(),\n`;
    security += `    severity: getSeverityLevel(event.type)\n`;
    security += `  });\n`;
    security += `  \n`;
    security += `  // Alert on suspicious patterns\n`;
    security += `  if (event.type === 'failed_auth') {\n`;
    security += `    await checkForBruteForce(event.ip, event.userId);\n`;
    security += `  }\n`;
    security += `};\n`;
    security += `\`\`\`\n\n`;

    security += `### Sophistication-Aware Security\n`;
    const sophisticationLevel = context.userProfile.sophisticationLevel;
    if (sophisticationLevel <= 2) {
      security += `**Beginner-Friendly Security**:\n`;
      security += `- Clear security messaging without technical jargon\n`;
      security += `- Guided setup for MFA with visual instructions\n`;
      security += `- Automatic security best practices application\n`;
      security += `- Simple privacy controls with explanations\n`;
    } else {
      security += `**Advanced Security Features**:\n`;
      security += `- Detailed security logs and audit trails\n`;
      security += `- Advanced MFA options (hardware keys, biometrics)\n`;
      security += `- Granular privacy and data sharing controls\n`;
      security += `- API security configuration options\n`;
    }

    security += `\n### Compliance & Standards\n`;
    security += `- **OWASP Top 10**: Protection against all common vulnerabilities\n`;
    security += `- **GDPR**: Full compliance for EU users\n`;
    security += `- **CCPA**: California privacy compliance\n`;
    security += `- **SOC 2 Type II**: Security and availability controls\n`;
    security += `- **ISO 27001**: Information security management standards\n`;

    return security;
  }

  private async generatePerformanceOptimization(input: string, context: AgentContext): Promise<string> {
    let perf = `## Performance Optimization Strategy\n\n`;

    perf += `### Performance Targets\n`;
    perf += `- **API Response Time**: < 200ms for 95th percentile\n`;
    perf += `- **AI Processing**: < 5 seconds for complex transformations\n`;
    perf += `- **Database Queries**: < 50ms for simple operations\n`;
    perf += `- **Memory Usage**: < 512MB per service instance\n`;
    perf += `- **Throughput**: Handle 1000+ concurrent users\n\n`;

    perf += `### Caching Strategy\n`;
    perf += `\`\`\`typescript\n`;
    perf += `// Multi-layer caching implementation\n`;
    perf += `class CacheManager {\n`;
    perf += `  private redis: Redis;\n`;
    perf += `  private memoryCache: LRUCache<string, any>;\n\n`;

    perf += `  async get(key: string, options: CacheOptions = {}) {\n`;
    perf += `    // L1: Memory cache (fastest)\n`;
    perf += `    let value = this.memoryCache.get(key);\n`;
    perf += `    if (value !== undefined) return value;\n\n`;

    perf += `    // L2: Redis cache (fast, shared)\n`;
    perf += `    const serialized = await this.redis.get(key);\n`;
    perf += `    if (serialized) {\n`;
    perf += `      value = JSON.parse(serialized);\n`;
    perf += `      this.memoryCache.set(key, value);\n`;
    perf += `      return value;\n`;
    perf += `    }\n\n`;

    perf += `    // L3: Database or computation (slowest)\n`;
    perf += `    if (options.fallback) {\n`;
    perf += `      value = await options.fallback();\n`;
    perf += `      await this.set(key, value, options.ttl);\n`;
    perf += `      return value;\n`;
    perf += `    }\n\n`;

    perf += `    return null;\n`;
    perf += `  }\n\n`;

    perf += `  async set(key: string, value: any, ttl: number = 300) {\n`;
    perf += `    this.memoryCache.set(key, value);\n`;
    perf += `    await this.redis.setex(key, ttl, JSON.stringify(value));\n`;
    perf += `  }\n`;
    perf += `}\n`;
    perf += `\`\`\`\n\n`;

    perf += `### Database Optimization\n`;
    perf += `\`\`\`sql\n`;
    perf += `-- Query optimization for transformation tracking\n`;
    perf += `EXPLAIN ANALYZE\n`;
    perf += `SELECT g.*, COUNT(m.id) as milestone_count,\n`;
    perf += `       COUNT(CASE WHEN m.completed = true THEN 1 END) as completed_milestones\n`;
    perf += `FROM transformation_goals g\n`;
    perf += `LEFT JOIN transformation_milestones m ON g.id = m.goal_id\n`;
    perf += `WHERE g.user_id = $1 AND g.status = 'active'\n`;
    perf += `GROUP BY g.id\n`;
    perf += `ORDER BY g.created_at DESC;\n\n`;

    perf += `-- Optimized context retrieval with embedding similarity\n`;
    perf += `SELECT cs.*, \n`;
    perf += `       (cs.context_embedding <=> $1::vector) as similarity\n`;
    perf += `FROM conversation_sessions cs\n`;
    perf += `WHERE cs.user_id = $2\n`;
    perf += `  AND (cs.context_embedding <=> $1::vector) < 0.3\n`;
    perf += `ORDER BY similarity\n`;
    perf += `LIMIT 10;\n`;
    perf += `\`\`\`\n\n`;

    perf += `### Connection Pooling\n`;
    perf += `\`\`\`typescript\n`;
    perf += `import { Pool } from 'pg';\n\n`;
    perf += `const dbPool = new Pool({\n`;
    perf += `  host: process.env.DB_HOST,\n`;
    perf += `  port: parseInt(process.env.DB_PORT || '5432'),\n`;
    perf += `  database: process.env.DB_NAME,\n`;
    perf += `  user: process.env.DB_USER,\n`;
    perf += `  password: process.env.DB_PASSWORD,\n`;
    perf += `  \n`;
    perf += `  // Pool configuration for performance\n`;
    perf += `  min: 5,        // Minimum connections\n`;
    perf += `  max: 20,       // Maximum connections\n`;
    perf += `  acquireTimeoutMillis: 30000,\n`;
    perf += `  createTimeoutMillis: 30000,\n`;
    perf += `  idleTimeoutMillis: 30000,\n`;
    perf += `  reapIntervalMillis: 1000,\n`;
    perf += `  createRetryIntervalMillis: 2000\n`;
    perf += `});\n\n`;

    perf += `// Connection health monitoring\n`;
    perf += `dbPool.on('connect', () => console.log('Database connected'));\n`;
    perf += `dbPool.on('error', (err) => console.error('Database error:', err));\n`;
    perf += `\`\`\`\n\n`;

    perf += `### API Response Optimization\n`;
    perf += `\`\`\`typescript\n`;
    perf += `// Response compression middleware\n`;
    perf += `import compression from 'compression';\n`;
    perf += `app.use(compression({\n`;
    perf += `  filter: (req, res) => {\n`;
    perf += `    // Compress all responses except already compressed formats\n`;
    perf += `    if (req.headers['x-no-compression']) return false;\n`;
    perf += `    return compression.filter(req, res);\n`;
    perf += `  },\n`;
    perf += `  threshold: 1024 // Only compress responses larger than 1KB\n`;
    perf += `}));\n\n`;

    perf += `// Response pagination for large datasets\n`;
    perf += `interface PaginationOptions {\n`;
    perf += `  page: number;\n`;
    perf += `  limit: number;\n`;
    perf += `  sortBy?: string;\n`;
    perf += `  sortOrder?: 'ASC' | 'DESC';\n`;
    perf += `}\n\n`;

    perf += `const paginateResults = async (query: string, options: PaginationOptions) => {\n`;
    perf += `  const offset = (options.page - 1) * options.limit;\n`;
    perf += `  const sortClause = options.sortBy ? \n`;
    perf += `    \`ORDER BY \${options.sortBy} \${options.sortOrder || 'ASC'}\` : '';\n`;
    perf += `  \n`;
    perf += `  const paginatedQuery = \`\n`;
    perf += `    \${query} \${sortClause}\n`;
    perf += `    LIMIT \${options.limit} OFFSET \${offset}\n`;
    perf += `  \`;\n`;
    perf += `  \n`;
    perf += `  const [results, total] = await Promise.all([\n`;
    perf += `    db.query(paginatedQuery),\n`;
    perf += `    db.query(\`SELECT COUNT(*) FROM (\${query}) as count_query\`)\n`;
    perf += `  ]);\n`;
    perf += `  \n`;
    perf += `  return {\n`;
    perf += `    data: results.rows,\n`;
    perf += `    pagination: {\n`;
    perf += `      page: options.page,\n`;
    perf += `      limit: options.limit,\n`;
    perf += `      total: parseInt(total.rows[0].count),\n`;
    perf += `      totalPages: Math.ceil(parseInt(total.rows[0].count) / options.limit)\n`;
    perf += `    }\n`;
    perf += `  };\n`;
    perf += `};\n`;
    perf += `\`\`\`\n\n`;

    perf += `### Background Job Processing\n`;
    perf += `\`\`\`typescript\n`;
    perf += `import Bull from 'bull';\n\n`;
    perf += `// Queue for AI processing tasks\n`;
    perf += `const aiProcessingQueue = new Bull('ai processing', {\n`;
    perf += `  redis: { host: process.env.REDIS_HOST, port: 6379 },\n`;
    perf += `  defaultJobOptions: {\n`;
    perf += `    removeOnComplete: 10,\n`;
    perf += `    removeOnFail: 50,\n`;
    perf += `    attempts: 3,\n`;
    perf += `    backoff: { type: 'exponential', delay: 2000 }\n`;
    perf += `  }\n`;
    perf += `});\n\n`;

    perf += `// Process transformation analysis jobs\n`;
    perf += `aiProcessingQueue.process('analyze-transformation', 5, async (job) => {\n`;
    perf += `  const { userId, goalId, context } = job.data;\n`;
    perf += `  \n`;
    perf += `  try {\n`;
    perf += `    const analysis = await analyzeTransformationProgress(userId, goalId, context);\n`;
    perf += `    \n`;
    perf += `    // Cache results for future use\n`;
    perf += `    await cacheManager.set(\n`;
    perf += `      \`transformation-analysis:\${userId}:\${goalId}\`,\n`;
    perf += `      analysis,\n`;
    perf += `      3600 // 1 hour TTL\n`;
    perf += `    );\n`;
    perf += `    \n`;
    perf += `    return analysis;\n`;
    perf += `  } catch (error) {\n`;
    perf += `    console.error('Transformation analysis failed:', error);\n`;
    perf += `    throw error;\n`;
    perf += `  }\n`;
    perf += `});\n`;
    perf += `\`\`\`\n\n`;

    perf += `### Monitoring & Metrics\n`;
    perf += `\`\`\`typescript\n`;
    perf += `import { performance } from 'perf_hooks';\n\n`;
    perf += `// Performance monitoring middleware\n`;
    perf += `const performanceMonitoring = (req: Request, res: Response, next: NextFunction) => {\n`;
    perf += `  const start = performance.now();\n`;
    perf += `  \n`;
    perf += `  res.on('finish', () => {\n`;
    perf += `    const duration = performance.now() - start;\n`;
    perf += `    \n`;
    perf += `    // Log slow requests\n`;
    perf += `    if (duration > 1000) {\n`;
    perf += `      console.warn(\`Slow request: \${req.method} \${req.path} - \${duration}ms\`);\n`;
    perf += `    }\n`;
    perf += `    \n`;
    perf += `    // Send metrics to monitoring service\n`;
    perf += `    metrics.histogram('api_request_duration', duration, {\n`;
    perf += `      method: req.method,\n`;
    perf += `      route: req.path,\n`;
    perf += `      status_code: res.statusCode.toString()\n`;
    perf += `    });\n`;
    perf += `  });\n`;
    perf += `  \n`;
    perf += `  next();\n`;
    perf += `};\n`;
    perf += `\`\`\`\n\n`;

    perf += `### Scaling Recommendations\n`;
    perf += `1. **Horizontal Scaling**: Load balancer with multiple backend instances\n`;
    perf += `2. **Database Scaling**: Read replicas for query distribution\n`;
    perf += `3. **Caching**: Redis Cluster for distributed caching\n`;
    perf += `4. **CDN**: Static asset distribution and API caching\n`;
    perf += `5. **Microservices**: Split by domain (auth, transformation, AI processing)\n`;
    perf += `6. **Queue Workers**: Separate instances for background job processing\n`;

    return perf;
  }

  private async generateBackendStrategy(input: string, context: AgentContext): Promise<string> {
    let strategy = `## Backend Development Strategy\n\n`;

    const sophisticationLevel = context.userProfile.sophisticationLevel;
    const transformationGoals = context.transformationGoals;

    strategy += `### Architecture Overview\n`;
    strategy += `**Framework**: Node.js with TypeScript and Express.js\n`;
    strategy += `**Database**: PostgreSQL with PGVector for embeddings\n`;
    strategy += `**Caching**: Redis for session management and response caching\n`;
    strategy += `**Message Queue**: Bull/Redis for background job processing\n`;
    strategy += `**Authentication**: JWT with refresh token rotation\n\n`;

    if (sophisticationLevel <= 2) {
      strategy += `**Simplified Backend Approach**:\n`;
      strategy += `- Monolithic architecture for easier deployment and maintenance\n`;
      strategy += `- RESTful APIs with clear, predictable endpoints\n`;
      strategy += `- Built-in error handling with user-friendly messages\n`;
      strategy += `- Automatic data validation and sanitization\n`;
      strategy += `- Simple deployment with minimal configuration\n\n`;
    } else {
      strategy += `**Advanced Backend Architecture**:\n`;
      strategy += `- Microservices architecture with domain-driven design\n`;
      strategy += `- GraphQL API with RESTful fallbacks\n`;
      strategy += `- Event-driven architecture with message queues\n`;
      strategy += `- Advanced caching strategies and performance optimization\n`;
      strategy += `- Container orchestration with Kubernetes\n\n`;
    }

    strategy += `### Core Services Design\n\n`;
    strategy += `#### 1. User Management Service\n`;
    strategy += `**Responsibilities**:\n`;
    strategy += `- User registration, authentication, and profile management\n`;
    strategy += `- Sophistication level tracking and adaptation\n`;
    strategy += `- Privacy preferences and data management\n`;
    strategy += `- User journey stage progression\n\n`;

    strategy += `#### 2. Transformation Engine Service\n`;
    strategy += `**Responsibilities**:\n`;
    strategy += `- Goal creation, tracking, and milestone management\n`;
    strategy += `- Progress calculation and analytics\n`;
    strategy += `- Achievement recognition and celebration\n`;
    strategy += `- Personalized recommendation generation\n\n`;

    strategy += `#### 3. AI Orchestration Service\n`;
    strategy += `**Responsibilities**:\n`;
    strategy += `- Agent selection and routing\n`;
    strategy += `- Context management and memory persistence\n`;
    strategy += `- Response quality assurance and enhancement\n`;
    strategy += `- Performance monitoring and optimization\n\n`;

    strategy += `#### 4. Context & Memory Service\n`;
    strategy += `**Responsibilities**:\n`;
    strategy += `- Conversation history management\n`;
    strategy += `- Context compression and semantic search\n`;
    strategy += `- Cross-session context preservation\n`;
    strategy += `- Memory optimization and cleanup\n\n`;

    strategy += `### Transformation-Enabling Backend Features\n\n`;
    for (const goal of transformationGoals.slice(0, 2)) {
      strategy += `#### Backend Support for "${goal.description}"\n`;
      strategy += `**Current State Tracking**:\n`;
      strategy += `- Baseline assessment APIs\n`;
      strategy += `- Progress measurement endpoints\n`;
      strategy += `- Behavioral pattern analysis\n\n`;

      strategy += `**Goal Progression Logic**:\n`;
      strategy += `- Milestone completion validation\n`;
      strategy += `- Next step recommendation algorithms\n`;
      strategy += `- Adaptive difficulty adjustment\n`;
      strategy += `- Success prediction models\n\n`;
    }

    strategy += `### Data Flow Architecture\n`;
    strategy += `\`\`\`\n`;
    strategy += `User Request ➜ API Gateway ➜ Authentication ➜ Rate Limiting\n`;
    strategy += `     ↓\n`;
    strategy += `Route Handler ➜ Input Validation ➜ Business Logic\n`;
    strategy += `     ↓\n`;
    strategy += `Database Query ➜ Cache Check ➜ Response Enhancement\n`;
    strategy += `     ↓\n`;
    strategy += `Context Storage ➜ Analytics Logging ➜ JSON Response\n`;
    strategy += `\`\`\`\n\n`;

    strategy += `### Error Handling Strategy\n`;
    strategy += `1. **Graceful Degradation**: System continues functioning with reduced capability\n`;
    strategy += `2. **User-Friendly Messages**: Clear, actionable error messages\n`;
    strategy += `3. **Automatic Retry**: Transient failures handled automatically\n`;
    strategy += `4. **Fallback Responses**: Default responses when AI processing fails\n`;
    strategy += `5. **Comprehensive Logging**: All errors logged for analysis\n\n`;

    strategy += `### Performance Optimization\n`;
    strategy += `- **Response Caching**: Cache frequently requested transformation data\n`;
    strategy += `- **Database Optimization**: Query optimization and proper indexing\n`;
    strategy += `- **Background Processing**: Heavy computations moved to job queues\n`;
    strategy += `- **Connection Pooling**: Efficient database connection management\n`;
    strategy += `- **Compression**: Response compression for bandwidth optimization\n\n`;

    strategy += `### Deployment Strategy\n`;
    if (sophisticationLevel <= 2) {
      strategy += `**Simple Deployment**:\n`;
      strategy += `- Single server deployment with PM2 process management\n`;
      strategy += `- SQLite or managed PostgreSQL database\n`;
      strategy += `- Simple backup and monitoring solutions\n`;
      strategy += `- Minimal configuration requirements\n`;
    } else {
      strategy += `**Production-Grade Deployment**:\n`;
      strategy += `- Docker containerization with Kubernetes orchestration\n`;
      strategy += `- Multi-region deployment with load balancing\n`;
      strategy += `- Advanced monitoring with Prometheus and Grafana\n`;
      strategy += `- CI/CD pipeline with automated testing and deployment\n`;
    }

    strategy += `\n### Quality Assurance\n`;
    strategy += `1. **Automated Testing**: Unit, integration, and end-to-end tests\n`;
    strategy += `2. **Code Quality**: ESLint, Prettier, and SonarQube analysis\n`;
    strategy += `3. **Security Scanning**: Automated vulnerability assessments\n`;
    strategy += `4. **Performance Testing**: Load testing and performance benchmarks\n`;
    strategy += `5. **Documentation**: API documentation with OpenAPI/Swagger\n`;

    return strategy;
  }
}