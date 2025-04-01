# Demo MCP Basic

This project demonstrates a fundamental client-server interaction using the **Model Context Protocol (MCP)**. MCP allows AI models, like those accessed via the AI SDK (e.g., Google Gemini/Vertex AI), to securely discover and utilize external tools or resources provided by a separate server process.

In this example:

- The **Server** (`src/server/`) acts as an MCP provider, offering simple calculation tools (addition, subtraction, etc.).
- The **Client** (`src/client/`) uses the AI SDK to interact with a Google AI model and connects to the MCP server to make the server's tools available to the AI during generation.

This setup illustrates how you can extend the capabilities of AI models by giving them access to custom functionalities hosted on an MCP server.

## Prerequisites

- Node.js (Version >=23.0.0 as specified in `package.json`)
- npm (comes with Node.js)
- A Google AI (Gemini) API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/). (Required for using Gemini models).

## Setup

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:bertrandgressier/demo-ts-mcp-client-server.git
    cd demo-mcp-basic
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create Environment File:**
    Copy the example environment file `.env.example` to a new file named `.env`:

    ```bash
    cp .env.example .env
    ```

    Then, edit the `.env` file to add your actual API keys and configuration. The required and optional variables are:

    ```dotenv
    # Required for Google Studio Models (Gemini)
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY

    # Required for Google Vertex AI Models
    VERTEX_PROJECT_ID=YOUR_VERTEX_PROJECT_ID

    # Optional: Defaults to 'us-central1' if not set
    # VERTEX_LOCATION=your-vertex-location

    # Optional: Path to Vertex AI service account key file. Defaults to 'vertex-key.json' in the root if not set.
    # VERTEX_KEY_FILE=path/to/your/vertex-key.json
    ```

    _Replace `YOUR_GOOGLE_API_KEY` and `YOUR_VERTEX_PROJECT_ID` with your actual credentials._
    _If you use a Vertex AI key file, ensure it's placed correctly (e.g., in the root as `vertex-key.json` or provide the correct path in `VERTEX_KEY_FILE`)._

    - **Important:** The `.gitignore` file is configured to prevent `.env` and `vertex-key.json` from being committed to Git.

## Available Scripts

- **Build TypeScript:**

  ```bash
  npm run build
  ```

  Compiles TypeScript code from `src` to JavaScript in `dist`.

- **Start Production Server:**

  ```bash
  npm run start
  # or specifically
  npm run start:server
  ```

  Builds the project (if not already built) and runs the compiled server from `dist/server/server.js`.

- **Start Production Client:**

  ```bash
  npm run start:client
  ```

  Runs the compiled client from `dist/client/client.js`.

- **Run Server in Development Mode:**

  ```bash
  npm run dev:server
  ```

  Runs the server directly using `ts-node` (or similar via `--experimental-transform-types`) without needing a separate build step.

- **Run Server in Development Mode with Watch:**

  ```bash
  npm run dev:server:watch
  ```

  Runs the server using `nodemon`, automatically restarting it when changes are detected in the `src/server` directory.

- **Run Client in Development Mode:**
  ```bash
  npm run dev:client
  ```
  Runs the client directly using `ts-node` (or similar).

## Example Client (`src/client/client.ts`)

The primary example client script demonstrates the following:

1.  **Connects to the MCP Server:** Establishes a connection to the locally running MCP server (expected at `http://localhost:3001/sse`).
2.  **Fetches Tools:** Retrieves the list of tools made available by the connected server.
3.  **Configures AI Model:** Uses the AI SDK (`generateText`) configured with a Google AI model (Gemini via API Key or Vertex AI, depending on environment variables set in `.env` and potentially `src/models/google-ai-provider.ts`).
4.  **Executes Prompt:** Sends a prompt (`6 + 12`) along with a system message instructing the AI to use the fetched tools to solve the calculation.
5.  **Outputs Result:** Prints the final text response generated by the AI model after potentially using the server-provided tools.

This client serves as a basic illustration of how an application can interact with an MCP server to leverage its tools within an AI generation flow.

## Project Structure

- `src/`: Contains the TypeScript source code.
  - `client/`: Code for the MCP client application.
  - `server/`: Code for the MCP server application.
  - `model.ts`: Handles AI model initialization and environment variable loading.
- `dist/`: Contains the compiled JavaScript code (after running `npm run build`).
- `.env`: Stores environment variables (API keys, etc.) - **Do not commit this file.**
- `package.json`: Project metadata and dependencies.
- `tsconfig.json`: TypeScript compiler configuration.
