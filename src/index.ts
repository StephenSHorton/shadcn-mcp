import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "@/lib/config";
import { registerComponentResources } from "@/resources/component";
import { registerComponentPrompts } from "@/prompts/component";
import { registerComponentTool } from "@/tools/component";
import { registerListComponentsTool } from "@/tools/list-components";

async function main() {
	// Register generic component resources, prompts, and tools
	console.error("Registering component resources...");
	registerComponentResources(server);

	console.error("Registering component prompts...");
	registerComponentPrompts(server);

	console.error("Registering component tools...");
	registerComponentTool(server);
	registerListComponentsTool(server);

	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Shadcn MCP Server running on stdio - All components supported!");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
