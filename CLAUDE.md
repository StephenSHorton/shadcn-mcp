# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an MCP (Model Context Protocol) server that provides access to all 57+ Shadcn/ui component documentation. The server uses a **generic architecture** where a single set of handlers dynamically supports all components, rather than creating separate files for each component.

## Essential Commands

```bash
# Development
bun run dev          # Run server in development mode (uses src/index.ts directly)

# Building
bun run build        # Compile TypeScript and bundle with Bun (outputs to ./build)

# Linting
bun run lint         # Run Biome formatter/linter with auto-fix
```

## Architecture Overview

### Core Design Pattern: Generic Component Handlers

The codebase uses a **parameter-based generic architecture** rather than component-specific implementations. This means:

- ONE resource template handles all 57+ components using URI variables
- ONE tool accepts component slug as parameter
- ONE set of prompts accepts component as argument

**Key files:**
- `src/resources/component.ts` - 4 resource templates with `{component}` variable
- `src/prompts/component.ts` - 4 prompts accepting `component` parameter
- `src/tools/component.ts` - Generic `get-component-info(component)` tool
- `src/tools/list-components.ts` - Lists all available components

### MCP Server Configuration Critical Detail

**IMPORTANT:** The `McpServer` constructor takes TWO parameters:
1. `serverInfo` - `{ name, version }` (Implementation object)
2. `options` - `{ capabilities }` (ServerOptions object)

Capabilities MUST go in the second parameter, NOT the first. See `src/lib/config.ts:3-14`.

```typescript
// ✅ CORRECT
new McpServer(
  { name: "shadcn-mcp", version: "0.1.0" },
  { capabilities: { resources: {}, prompts: {}, tools: {} } }
)

// ❌ WRONG - will not work
new McpServer({
  name: "shadcn-mcp",
  version: "0.1.0",
  capabilities: { ... }  // capabilities in wrong place
})
```

### Data Flow

1. **Entry Point** (`src/index.ts`) - Registers all handlers and connects to transport
2. **Fetching Layer** (`src/api/shadcn.ts`) - Fetches from ui.shadcn.com and registry
3. **Handler Layer** (`src/resources/`, `src/prompts/`, `src/tools/`) - Processes requests
4. **Response** - Returns formatted data to Claude Desktop

### URI Template Pattern

Resources use MCP's ResourceTemplate class with variables:
```typescript
new ResourceTemplate("shadcn://component/{component}/documentation", {
  list: async () => { /* return all resources */ }
})
```

This single template creates resources for ALL components:
- `shadcn://component/button/documentation`
- `shadcn://component/dialog/documentation`
- `shadcn://component/accordion/documentation`
- etc.

### Component Discovery

`fetchAllComponents()` in `src/api/shadcn.ts` dynamically fetches the component list from ui.shadcn.com by parsing HTML. It includes a hardcoded fallback list in `getDefaultComponentsList()` for offline/error scenarios.

## TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ESNext with bundler module resolution
- Strict mode enabled
- Outputs to `./build` directory

## Zod Version Requirement

**CRITICAL:** Must use Zod v3 (`^3.23.8`), NOT v4. The MCP SDK v1.20.1 has a peer dependency on Zod v3. Using Zod v4 causes schema conversion failures where input schemas appear empty in the MCP protocol.

## Adding Support for New Shadcn Components

**No code changes needed!** The generic architecture automatically supports any component that:
1. Exists at `https://ui.shadcn.com/docs/components/{slug}`
2. Has a registry entry at `https://ui.shadcn.com/registry/styles/default/{slug}.json`

New components are automatically discovered by `fetchAllComponents()`.

## Testing the MCP

After building, configure Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "shadcn-mcp": {
      "command": "/path/to/bun",
      "args": ["/absolute/path/to/shadcn-mcp/build/index.js"]
    }
  }
}
```

**Must use absolute paths.** Restart Claude Desktop completely (quit from menu).

## Error Handling Pattern

All fetch functions return `null` or empty arrays on failure and log to stderr. The server never crashes on fetch failures - it provides helpful error messages to users instead.

## Logging

Use `console.error()` for all logging. STDOUT is reserved for MCP JSON-RPC protocol. Writing to stdout will corrupt the protocol and break the server.
