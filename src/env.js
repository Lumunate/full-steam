import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

// Define required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
];

// Define optional environment variables with default values
const optionalEnvVars = {
  'NODE_ENV': 'development',
  'PORT': '3000',
};

// Validate required environment variables
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
    `Please add them to your .env file.`
  );
}

// Create and validate the environment configuration
const env = {
  // Required variables
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  
  // Optional variables with defaults
  nodeEnv: process.env.NODE_ENV || optionalEnvVars.NODE_ENV,
  port: parseInt(process.env.PORT || optionalEnvVars.PORT, 10),
  
  // Computed properties
  isDevelopment: (process.env.NODE_ENV || optionalEnvVars.NODE_ENV) === 'development',
  isProduction: (process.env.NODE_ENV || optionalEnvVars.NODE_ENV) === 'production',
  isTest: (process.env.NODE_ENV || optionalEnvVars.NODE_ENV) === 'test',
};

// Additional validations
if (env.apiUrl && !env.apiUrl.startsWith('http')) {
  console.warn(`NEXT_PUBLIC_API_URL (${env.apiUrl}) should start with http:// or https://`);
}

export default env;

