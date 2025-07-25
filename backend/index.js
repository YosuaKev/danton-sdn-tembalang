// index.js
import app from './app.js';
import serverless from 'serverless-http';
import connectDB from "./config/db.js";

await connectDB();
export const handler = serverless(app);