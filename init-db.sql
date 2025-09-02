-- Initialize AI Orchestration Database
-- This script sets up the core tables for the AI orchestration system

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- User Management Tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sophistication_level INTEGER CHECK (sophistication_level BETWEEN 1 AND 5) DEFAULT 3,
  cultural_context JSONB,
  preferences JSONB,
  demographics JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Transformation Goals & Journey
CREATE TABLE transformation_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  current_state TEXT NOT NULL,
  desired_state TEXT NOT NULL,
  progress INTEGER CHECK (progress BETWEEN 0 AND 100) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transformation_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID REFERENCES transformation_goals(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transformation_journey (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stage VARCHAR(50) NOT NULL CHECK (stage IN (
    'unaware', 'problem_aware', 'solution_aware', 'product_aware', 'most_aware'
  )),
  progression INTEGER CHECK (progression BETWEEN 0 AND 100) DEFAULT 0,
  stage_entered_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Context & Memory Management
CREATE TABLE conversation_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  context JSONB,
  context_embedding VECTOR(1536), -- OpenAI embedding dimension
  compressed_history TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES conversation_sessions(id) ON DELETE CASCADE,
  message_id VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent System
CREATE TABLE agent_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES conversation_sessions(id),
  agent_name VARCHAR(100) NOT NULL,
  input_text TEXT NOT NULL,
  response_text TEXT NOT NULL,
  confidence DECIMAL(3,2),
  transformation_value DECIMAL(3,2),
  processing_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Aha Moments & Insights
CREATE TABLE aha_moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  impact INTEGER CHECK (impact BETWEEN 1 AND 10),
  context JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Indexes for Performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_conversation_sessions_session_id ON conversation_sessions(session_id);
CREATE INDEX idx_conversation_sessions_user_id ON conversation_sessions(user_id);
CREATE INDEX idx_transformation_goals_user_id ON transformation_goals(user_id);
CREATE INDEX idx_transformation_goals_status ON transformation_goals(status);
CREATE INDEX idx_milestones_goal_id ON transformation_milestones(goal_id);
CREATE INDEX idx_conversation_embedding ON conversation_sessions 
  USING ivfflat (context_embedding vector_cosine_ops);
CREATE INDEX idx_agent_interactions_session ON agent_interactions(session_id);
CREATE INDEX idx_agent_interactions_agent ON agent_interactions(agent_name);
CREATE INDEX idx_agent_interactions_created ON agent_interactions(created_at);

-- Insert sample data for testing
INSERT INTO users (email) VALUES ('demo@example.com');

INSERT INTO user_profiles (user_id, sophistication_level, cultural_context, preferences)
SELECT id, 3, '{"region": "global", "language": "en"}', '{"theme": "professional"}'
FROM users WHERE email = 'demo@example.com';

INSERT INTO transformation_goals (user_id, description, current_state, desired_state, progress)
SELECT id, 'Become a full-stack developer', 'beginner programmer', 'expert developer', 25
FROM users WHERE email = 'demo@example.com';

COMMIT;