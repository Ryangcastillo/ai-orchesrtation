# AI Orchestration System

A highly modular AI agent system designed for easy integration into chatboxes, applications, and workflows. Built with transformation-focused design, sophistication adaptation, and comprehensive context management.

## 🚀 Quick Start

### Installation

```bash
npm install
npm run build
npm start
```

### Basic Usage

```typescript
import { createAIOrchestrator } from './src';

// Initialize the orchestrator
const orchestrator = await createAIOrchestrator();

// Process user input
const response = await orchestrator.process(
  "Design a scalable architecture for my app",
  "session-123",
  "user-456"
);

console.log(response.content);
```

### Chatbot Integration

```typescript
const orchestrator = await createAIOrchestrator();
const plugin = orchestrator.createChatbotPlugin();

// Handle messages
const response = await plugin.handleMessage(
  "Help me plan my project",
  "session-123",
  "user-456"
);
```

## 🏗️ Architecture

### Core Components

1. **AI Orchestrator**: Main coordinator that manages agents and routes requests
2. **Base Agent**: Abstract foundation for all specialized agents
3. **Memory Manager**: Context and conversation management system
4. **Plugin System**: Easy integration framework

### Available Agents

- **Technical Strategy Agent**: System architecture and technical strategy
- **Agile Coordinator Agent**: Project management and sprint planning
- *(More agents coming soon - 12 additional specialized agents planned)*

## 🧩 Plugin Architecture

### Creating Custom Agents

```typescript
import { BaseAgent } from './src/core/base-agent';

class MyCustomAgent extends BaseAgent {
  constructor() {
    super(
      'MyCustomAgent',
      '1.0.0',
      ['custom_capability', 'specialized_task'],
      ['dependency1', 'dependency2']
    );
  }

  canHandle(input: string, context: AgentContext): boolean {
    return input.toLowerCase().includes('my-keyword');
  }

  protected async processCore(input: string, context: AgentContext): Promise<AgentResponse> {
    return {
      content: 'Custom response based on input',
      confidence: 0.9,
      transformationValue: 0.8
    };
  }
}
```

## 🎯 Key Features

### Transformation-Focused Design
Every agent helps users achieve their desired transformation with measurable progress tracking.

### Sophistication Adaptation
Responses automatically adapt to user expertise level (1-5 scale):
- **Level 1-2**: Simple language, basic concepts
- **Level 3**: Balanced complexity with examples  
- **Level 4-5**: Technical depth, advanced concepts

### Context Management
Persistent memory across conversations with automatic compression and semantic search.

### Market-Adaptive Responses
Responses adapt to user's journey stage (unaware → most aware).

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```bash
# Core Configuration
NODE_ENV=development
PORT=3000

# Memory Configuration  
MEMORY_COMPRESSION_THRESHOLD=100
CONTEXT_WINDOW_SIZE=30

# Feature Flags
ENABLE_TRANSFORMATION_TRACKING=true
ENABLE_QUALITY_LOOPS=true
```

## 🚀 Deployment

### Docker Deployment

```bash
docker build -t ai-orchestration .
docker run -p 3000:3000 ai-orchestration
```

### API Endpoints

- `GET /health` - System health status
- `POST /process` - Main processing endpoint
- `POST /chat` - Chatbot interface
- `GET /agents` - List available agents

## 🧪 Testing

```bash
npm test              # Run all tests
npm test -- --coverage  # With coverage
npm run lint         # Lint code
```

## 📚 Integration Examples

### Discord Bot
```typescript
const response = await orchestrator.process(
  message.content,
  `discord-${message.channel.id}`,
  message.author.id
);
```

### Slack Bot
```typescript
const response = await orchestrator.process(
  message.text,
  `slack-${message.channel}`,
  message.user
);
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License