import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getLogger } from './logger.ts'; // Import the helper function
import { z } from 'zod';

export function addAdditionTool(server: McpServer) {
  const logger = getLogger({ tool: 'addition' }); // Use helper for addition tool logger

  // Schéma d'entrée pour MCP (version simplifiée)
  const inputSchema = {
    a: z.number().describe('Premier nombre à additionner'),
    b: z.number().describe('Deuxième nombre à additionner'),
  };

  // Schéma de sortie Zod
  const outputZodSchema = z.object({
    result: z.number().describe("Résultat de l'addition"),
    operation: z.string().describe('Opération effectuée'),
  });

  server.tool('addition', `Adds two numbers`, inputSchema, async (args: unknown) => {
    // Validation des entrées avec le schéma Zod
    const validatedArgs = z.object(inputSchema).parse(args);

    logger.debug(`Processing input: a=${validatedArgs.a}, b=${validatedArgs.b}`); // Use child logger
    const result = validatedArgs.a + validatedArgs.b;

    // Validation et formatage de la sortie avec le schéma Zod
    const output = outputZodSchema.parse({
      result,
      operation: `${validatedArgs.a} + ${validatedArgs.b}`,
    });

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(output),
        },
      ],
    };
  });
}

const subtractionToolSchema = {
  a: z.number(),
  b: z.number(),
};

// Tool implementation for subtraction
export function addSubtractionTool(server: McpServer) {
  const logger = getLogger({ tool: 'subtraction' }); // Use helper for subtraction tool logger
  server.tool('subtract', 'je suis un outil pour faire des soustractions', subtractionToolSchema, async (args) => {
    logger.debug(`Processing input: a=${args.a}, b=${args.b}`); // Use child logger
    const result = args.a - args.b;
    logger.debug(`Result: ${result}`); // Use child logger
    return {
      content: [
        {
          type: 'text',
          text: String(result),
        },
      ],
    };
  });
}

const divisionToolSchema = {
  a: z.number(),
  b: z.number().refine((val) => val !== 0, {
    message: 'Division par zéro impossible',
  }),
};

// Tool implementation for division
export function addDivisionTool(server: McpServer) {
  const logger = getLogger({ tool: 'division' }); // Use helper for division tool logger
  server.tool('divide', 'je suis un outil pour faire des divisions', divisionToolSchema, async (args) => {
    logger.debug(`Processing input: a=${args.a}, b=${args.b}`); // Use child logger
    const result = args.a / args.b;
    logger.debug(`Result: ${result}`); // Use child logger
    return {
      content: [
        {
          type: 'text',
          text: String(result),
        },
      ],
    };
  });
}
