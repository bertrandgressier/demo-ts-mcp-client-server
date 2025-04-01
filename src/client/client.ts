import 'dotenv/config'; // Load .env file
import { experimental_createMCPClient as createMCPClient, generateText } from 'ai';
import { GoogleModel, vertexModel, googleStudioModel } from '../model.ts';

type MCPClient = Awaited<ReturnType<typeof createMCPClient>>;
let mcpClient: MCPClient | undefined;

async function main() {
  try {
    console.log('Connexion au serveur MCP...');
    mcpClient = await createMCPClient({
      transport: {
        type: 'sse',
        url: 'http://localhost:3001/sse',
      },
    });
    const tools = await mcpClient.tools();
    console.log('Connexion MCP établie ✅');

    const result = await generateText({
      // model: vertexModel(GoogleModel.Gemini20FlashLite),
      model: googleStudioModel(GoogleModel.Gemini20FlashLite),
      maxSteps: 20,
      tools,
      system: `
                CONSIGNES:
                - Tu as plusieurs outils à ta disposition pour faire des calculs,
                - Tu dois utiliser TOUS les outils et prendre le resultat correct qui est le plus proche de la réponse à la question,
                - Tu dois faire une phrase pour répondre à l'utilisateur
            `,
      prompt: '6 + 18 - 7',
    });

    console.log(`\n🌱 Résultat: ${result.text}\n`);
    await mcpClient?.close();
  } catch (error) {
    console.error('❌ Error:', error);
    await mcpClient?.close();
  }
}

main();
