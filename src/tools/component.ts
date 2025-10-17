import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import {
	fetchComponentDocumentation,
	fetchComponentExamples,
	fetchComponentInstallation,
	fetchComponentSource,
} from "@/api/shadcn";

export function registerComponentTool(server: McpServer) {
	server.tool(
		"get-component-info",
		"Get comprehensive information about any Shadcn/ui component",
		{
			component: z
				.string()
				.describe(
					"Component slug (e.g., button, dialog, accordion, data-table)",
				),
			section: z
				.enum(["all", "documentation", "examples", "source", "installation"])
				.describe("Which section of information to retrieve (default: all)")
				.optional(),
		},
		async ({ component, section = "all" }) => {
			const results: string[] = [];
			const componentName =
				component.charAt(0).toUpperCase() + component.slice(1);

			if (section === "all" || section === "documentation") {
				const docs = await fetchComponentDocumentation(component);
				if (docs) {
					results.push(
						`# ${docs.name} Documentation\n\n${docs.description}\n\n**URL:** https://ui.shadcn.com/docs/components/${component}\n\nFor full details, see the \`shadcn://component/${component}/documentation\` resource.`,
					);
				}
			}

			if (section === "all" || section === "installation") {
				const install = await fetchComponentInstallation(component);
				results.push(
					`## Installation\n\n\`\`\`bash\n${install.cliCommand}\n\`\`\`\n\nFor full installation instructions, see the \`shadcn://component/${component}/installation\` resource.`,
				);
			}

			if (section === "all" || section === "examples") {
				const examples = await fetchComponentExamples(component);
				if (examples.length > 0) {
					results.push(
						`## Examples\n\nFound ${examples.length} code example(s).\n\nSee the \`shadcn://component/${component}/example\` resource for full code examples.`,
					);
				} else {
					results.push(
						`## Examples\n\nNo examples found via scraping. Visit https://ui.shadcn.com/docs/components/${component} for documentation.`,
					);
				}
			}

			if (section === "all" || section === "source") {
				const source = await fetchComponentSource(component);
				if (source) {
					results.push(
						`## Source Code\n\nComponent file: ${source.fileName}\n\nSee the \`shadcn://component/${component}/source\` resource for the complete implementation.`,
					);
				}
			}

			// Add helpful next steps
			if (section === "all") {
				results.push(`## Next Steps

**To implement this component:**
1. Use the \`/implement-component component:"${component}"\` prompt for step-by-step guidance
2. Run: \`${(await fetchComponentInstallation(component)).cliCommand}\`
3. See examples at: https://ui.shadcn.com/docs/components/${component}

**For customization help:**
- Use the \`/customize-component component:"${component}"\` prompt

**For troubleshooting:**
- Use the \`/troubleshoot-component component:"${component}"\` prompt

**For best practices:**
- Use the \`/component-best-practices component:"${component}"\` prompt`);
			}

			const text = results.join("\n\n---\n\n");

			return {
				content: [
					{
						type: "text",
						text:
							text ||
							`No information available for "${component}". Please check the component name and try again.\n\nUse the \`list-shadcn-components\` tool to see all available components.`,
					},
				],
			};
		},
	);
}
