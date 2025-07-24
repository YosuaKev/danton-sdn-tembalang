import app from './app.js';
import serverless from 'serverless-http';

// Enhanced error handling for serverless
const handler = serverless(app, {
  binary: ['image/*', 'application/json']
});

export { handler };