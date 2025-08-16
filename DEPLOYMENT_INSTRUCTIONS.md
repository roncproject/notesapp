# Amplify Notes App Deployment Instructions

## Prerequisites
- AWS CLI configured with appropriate permissions
- Node.js 18+ installed
- Amplify CLI installed: `npm install -g @aws-amplify/cli`

## Step 1: Deploy the Backend

1. Navigate to the project root directory
2. Run the following command to deploy your backend:
   ```bash
   npx ampx sandbox
   ```
   This will start a local sandbox environment for development.

3. For production deployment, use:
   ```bash
   npx ampx deploy
   ```

## Step 2: Get Configuration Values

After deployment, you'll need to update the configuration values in `src/amplifyconfiguration.js`:

1. **For Sandbox Development:**
   - The configuration should be automatically generated
   - Check the `.amplify` directory for generated configuration files

2. **For Production:**
   - Get the User Pool ID from AWS Cognito console
   - Get the User Pool Client ID from AWS Cognito console  
   - Get the GraphQL endpoint from AWS AppSync console
   - Get the S3 bucket name from AWS S3 console

## Step 3: Update Environment Variables

Create a `.env` file in the project root with the following variables:

```env
VITE_USER_POOL_ID=your-user-pool-id
VITE_USER_POOL_CLIENT_ID=your-user-pool-client-id
VITE_GRAPHQL_ENDPOINT=your-graphql-endpoint
VITE_AWS_REGION=us-east-1
VITE_STORAGE_BUCKET=your-storage-bucket
```

## Step 4: Run the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Troubleshooting

If you encounter the "Client could not be generated" error:

1. Ensure the backend is deployed first
2. Verify that `Amplify.configure()` is called before `generateClient()`
3. Check that all required configuration values are provided
4. Make sure the GraphQL endpoint is accessible

## Alternative: Use Generated Configuration

For a more automated approach, you can use the generated configuration files:

1. After deployment, check if `.amplify/generated/amplifyconfiguration.json` exists
2. Import this configuration directly in your `main.jsx`:

```javascript
import { Amplify } from 'aws-amplify';
import amplifyConfig from '../.amplify/generated/amplifyconfiguration.json';

Amplify.configure(amplifyConfig);
```

This approach is recommended for production deployments as it automatically includes all the correct configuration values.
