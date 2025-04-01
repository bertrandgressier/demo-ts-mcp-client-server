# Demo MCP Basic

A basic demonstration project showcasing the Model Context Protocol (MCP) SDK integrated with Google AI models (Gemini/Vertex AI) via the AI SDK.

## Prerequisites

*   Node.js (Version >=23.0.0 as specified in `package.json`)
*   npm (comes with Node.js)

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
    Create a `.env` file in the root directory of the project. This file will store your API keys and configuration. Add the following variables:

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

    *Replace `YOUR_GOOGLE_API_KEY` and `YOUR_VERTEX_PROJECT_ID` with your actual credentials.*
    *If you use a Vertex AI key file, ensure it's placed correctly (e.g., in the root as `vertex-key.json` or provide the correct path in `VERTEX_KEY_FILE`).*
    * **Important:** The `.gitignore` file is configured to prevent `.env` and `vertex-key.json` from being committed to Git.

## Available Scripts

*   **Build TypeScript:**
    ```bash
    npm run build
    ```
    Compiles TypeScript code from `src` to JavaScript in `dist`.

*   **Start Production Server:**
    ```bash
    npm run start
    # or specifically
    npm run start:server
    ```
    Builds the project (if not already built) and runs the compiled server from `dist/server/server.js`.

*   **Start Production Client:**
    ```bash
    npm run start:client
    ```
    Runs the compiled client from `dist/client/client.js`.

*   **Run Server in Development Mode:**
    ```bash
    npm run dev:server
    ```
    Runs the server directly using `ts-node` (or similar via `--experimental-transform-types`) without needing a separate build step.

*   **Run Server in Development Mode with Watch:**
    ```bash
    npm run dev:server:watch
    ```
    Runs the server using `nodemon`, automatically restarting it when changes are detected in the `src/server` directory.

*   **Run Client in Development Mode:**
    ```bash
    npm run dev:client
    ```
    Runs the client directly using `ts-node` (or similar).

## Project Structure

*   `src/`: Contains the TypeScript source code.
    *   `client/`: Code for the MCP client application.
    *   `server/`: Code for the MCP server application.
    *   `model.ts`: Handles AI model initialization and environment variable loading.
*   `dist/`: Contains the compiled JavaScript code (after running `npm run build`).
*   `.env`: Stores environment variables (API keys, etc.) - **Do not commit this file.**
*   `package.json`: Project metadata and dependencies.
*   `tsconfig.json`: TypeScript compiler configuration.
