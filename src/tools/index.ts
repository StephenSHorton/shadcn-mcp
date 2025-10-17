import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetAlerts } from "./weather/get-alerts";
import { registerGetForecast } from "./weather/get-forecast";

export function registerAllTools(server: McpServer) {
	const tools = [
		{ name: "get_forecast", register: registerGetForecast },
		{ name: "get_alerts", register: registerGetAlerts },
	];

	for (const tool of tools) {
		try {
			tool.register(server);
			console.error(`✓ Registered tool: ${tool.name}`);
		} catch (error) {
			console.error(`✗ Failed to register tool: ${tool.name}`, error);
		}
	}
}
