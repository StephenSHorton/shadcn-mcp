import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fetchAllComponents } from "@/api/shadcn";

export function registerListComponentsTool(server: McpServer) {
	server.tool(
		"list-shadcn-components",
		"List all available Shadcn/ui components with their URLs",
		async () => {
			const components = await fetchAllComponents();

			if (components.length === 0) {
				return {
					content: [
						{
							type: "text",
							text: "Failed to fetch components list. Please check your internet connection.",
						},
					],
				};
			}

			// Format the list nicely
			const componentsList = components
				.map((comp) => `- **${comp.name}** (\`${comp.slug}\`) - ${comp.url}`)
				.join("\n");

			const text = `# Shadcn/ui Components (${components.length} total)

${componentsList}

## Usage

To get detailed information about any component, use the \`get-component-info\` tool with the component slug (e.g., "button", "accordion", "dialog").

For example:
- \`get-component-info("button")\`
- \`get-component-info("data-table")\`

Each component can be installed via:
\`\`\`bash
npx shadcn@latest add [component-slug]
\`\`\`
`;

			return {
				content: [
					{
						type: "text",
						text,
					},
				],
			};
		},
	);
}
