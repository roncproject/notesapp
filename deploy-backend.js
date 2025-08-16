#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting Amplify Backend Deployment...\n');

try {
  // Check if we're in the right directory
  if (!existsSync('amplify/backend.ts')) {
    console.error('❌ Error: amplify/backend.ts not found. Please run this script from the project root.');
    process.exit(1);
  }

  // Check if ampx is available
  try {
    execSync('npx ampx --version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ Error: ampx not found. Please install @aws-amplify/backend-cli first.');
    console.log('Run: npm install -g @aws-amplify/backend-cli');
    process.exit(1);
  }

  console.log('📦 Deploying backend to AWS...');
  
  // Deploy the backend
  execSync('npx ampx deploy', { stdio: 'inherit' });
  
  console.log('\n✅ Backend deployment completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Check the AWS Console for your deployed resources');
  console.log('2. Update your environment variables with the actual values');
  console.log('3. Run "npm run dev" to start your application');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\n💡 Troubleshooting tips:');
  console.log('- Make sure AWS CLI is configured with appropriate permissions');
  console.log('- Check that you have the necessary AWS services enabled');
  console.log('- Verify your AWS credentials are valid');
  process.exit(1);
}
