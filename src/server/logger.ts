import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug', // Default to 'info', allow override via env var
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Log stack traces
    winston.format.splat(),
    winston.format.json() // Use JSON format internally
  ),
  defaultMeta: { service: 'mcp-server' }, // Add service name to logs
  transports: [
    // In a real application, you might add file transports here:
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Add console transport for development/non-production environments
// Use a simpler, colorized format for console readability
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      // Modify printf to include module/tool context if present
      winston.format.printf(({ level, message, timestamp, stack, module, tool }) => {
        const context = module ? `[${module}]` : (tool ? `[Tool: ${tool}]` : '');
        // Include stack trace in console output if available
        return `${timestamp} ${level} ${context}: ${stack || message}`;
      })
    )
  }));
} else {
  // For production, you might want a standard console transport (e.g., JSON)
  logger.add(new winston.transports.Console({
    format: winston.format.json(), // Log JSON to console in production
  }));
}


export default logger;

/**
 * Creates a child logger with the given context metadata.
 * @param context - An object containing metadata (e.g., { module: 'MyModule' } or { tool: 'MyTool' }).
 * @returns A child logger instance.
 */
export function getLogger(context: Record<string, any>): winston.Logger {
  return logger.child(context);
}