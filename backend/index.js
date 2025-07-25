// index.js
import app from './app.js';
import { createServer } from '@vendia/serverless-express';

export default createServer(app);
