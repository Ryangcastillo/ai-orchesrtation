import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
  port: number;
  nodeEnv: string;
  logLevel: string;
  
  // AI Provider Configuration
  openaiApiKey?: string;
  anthropicApiKey?: string;
  
  // Vector Database Configuration
  vectorDb: {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
  };
  
  // Memory Configuration
  memory: {
    compressionThreshold: number;
    contextWindowSize: number;
    enableSemanticSearch: boolean;
  };
  
  // Security
  security: {
    jwtSecret: string;
    encryptionKey: string;
  };
  
  // Plugin Configuration
  plugins: {
    directory: string;
    enableHotReload: boolean;
  };
  
  // Market Adaptation
  marketAdaptation: {
    defaultSophisticationLevel: number;
    enableMarketAdaptation: boolean;
  };
  
  // Feature Flags
  features: {
    enableTransformationTracking: boolean;
    enableQualityLoops: boolean;
    enableAutomatedTesting: boolean;
  };
}

export const config: Config = {
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  
  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  
  vectorDb: {
    host: process.env.VECTOR_DB_HOST || 'localhost',
    port: parseInt(process.env.VECTOR_DB_PORT || '5432'),
    name: process.env.VECTOR_DB_NAME || 'ai_orchestration',
    user: process.env.VECTOR_DB_USER || 'postgres',
    password: process.env.VECTOR_DB_PASSWORD || 'password'
  },
  
  memory: {
    compressionThreshold: parseInt(process.env.MEMORY_COMPRESSION_THRESHOLD || '100'),
    contextWindowSize: parseInt(process.env.CONTEXT_WINDOW_SIZE || '30'),
    enableSemanticSearch: process.env.ENABLE_SEMANTIC_SEARCH === 'true'
  },
  
  security: {
    jwtSecret: process.env.JWT_SECRET || 'default-jwt-secret-change-in-production',
    encryptionKey: process.env.ENCRYPTION_KEY || 'default-encryption-key-change-in-production'
  },
  
  plugins: {
    directory: process.env.PLUGIN_DIRECTORY || './plugins',
    enableHotReload: process.env.ENABLE_HOT_RELOAD === 'true'
  },
  
  marketAdaptation: {
    defaultSophisticationLevel: parseInt(process.env.DEFAULT_SOPHISTICATION_LEVEL || '3'),
    enableMarketAdaptation: process.env.ENABLE_MARKET_ADAPTATION === 'true'
  },
  
  features: {
    enableTransformationTracking: process.env.ENABLE_TRANSFORMATION_TRACKING === 'true',
    enableQualityLoops: process.env.ENABLE_QUALITY_LOOPS === 'true',
    enableAutomatedTesting: process.env.ENABLE_AUTOMATED_TESTING === 'true'
  }
};

export default config;