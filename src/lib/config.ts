import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export const server = new McpServer(
	{
		name: "shadcn-mcp",
		version: "0.1.0",
	},
	{
		capabilities: {
			resources: {},
			prompts: {},
			tools: {},
		},
	},
);
