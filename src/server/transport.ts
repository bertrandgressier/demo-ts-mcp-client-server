import express from 'express'
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {SSEServerTransport} from '@modelcontextprotocol/sdk/server/sse.js';
import { getLogger } from './logger.ts'; // Import the helper function
const logger = getLogger({ module: 'Transport' }); // Use helper to create child logger

// Setup SSE transport
export function setupTransport(app: express.Application, server: McpServer) {
    let transport: SSEServerTransport

    // Add middleware to log all incoming requests with detailed information
    app.use((req, res, next) => {
        const clientIP = req.ip || req.socket.remoteAddress || 'unknown'
        const userAgent = req.get('User-Agent') || 'unknown'
        // This middleware seems redundant as server.ts already logs requests.
        // Commenting out for now, but could be replaced with logger.debug if needed.
        // logger.debug(`Transport Middleware: ${req.method} ${req.url}`, { ip: clientIP, userAgent: userAgent }); // Use child logger (logger) if uncommented
        next()
    })

    app.get('/sse', async (_req, res) => {
        transport = new SSEServerTransport('/messages', res)
        await server.connect(transport)
    })

    app.post('/messages', async (req, res) => {
        // Note: to support multiple simultaneous connections, these messages will
        // need to be routed to a specific matching transport. (This logic isn't
        // implemented here, for simplicity.)
        if (!transport) {
            res.status(404).send('No transport found')
            return
        }
        logger.debug(`Handling POST: ${req.method} ${req.url}`); // Use child logger (logger)
        // Avoid logging the entire body unless necessary for debugging, as it can be large.
        // If needed: logger.debug('Request Body:', { body: req.body }); // Use child logger (logger)
        await transport.handlePostMessage(req, res)
    })

    return app
}
