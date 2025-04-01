import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';

// Add a dynamic greeting resource
export function addGreetingResource(server: McpServer) {
  server.resource(
    'greeting',
    new ResourceTemplate('greeting://{name}', { list: undefined }),
    async (uri, { name }) => ({
      contents: [
        {
          uri: uri.href,
          text: `Hello, ${name}!`,
        },
      ],
    })
  );
}
