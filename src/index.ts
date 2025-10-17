import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "@/lib/config";
import { registerAccordionResources } from "@/resources/accordion";
import { registerAccordionPrompts } from "@/prompts/accordion";
import { registerAccordionTools } from "@/tools/accordion";

async function main() {
	// Register Accordion resources, prompts, and tools
	console.error("Registering Accordion resources...");
	registerAccordionResources(server);

	console.error("Registering Accordion prompts...");
	registerAccordionPrompts(server);

	console.error("Registering Accordion tools...");
	registerAccordionTools(server);

	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Shadcn MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});
