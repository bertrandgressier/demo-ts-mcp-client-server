import 'dotenv/config'; // Load .env file
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import express from 'express'
import { addAdditionTool, addSubtractionTool, addDivisionTool } from './tools.ts' // Changed extension to .ts
import {setupTransport} from './transport.ts' // Changed extension to .ts
import mainLogger, { getLogger } from './logger.ts'; // Import main logger and helper
const logger = getLogger({ module: 'Server' }); // Use helper to create child logger

// Create an MCP server
const server = new McpServer({
    name: 'Demo',
    version: '1.0.0'
})

// Add tools
addAdditionTool(server)
addSubtractionTool(server)
addDivisionTool(server)

// Add resources
// addGreetingResource(server)

// Setup express app and transport
const app = express()
setupTransport(app, server)

// Add a simple route for the root path
app.get('/', (req, res) => {
  res.send('Hello World')
})
// Add middleware to log all incoming requests using Winston
// Use the main logger for request logging as it's cross-cutting
app.use((req, res, next) => {
  const clientIP = req.ip || req.socket.remoteAddress || 'unknown';
  const userAgent = req.get('User-Agent') || 'unknown';
  mainLogger.info(`${req.method} ${req.url}`, { // Use mainLogger here
    ip: clientIP,
    userAgent: userAgent,
  });
  next();
});

// Start the server
app.listen(3001, () => {
    logger.info('Server is running on port 3001'); // Use the child logger (logger) here
})
