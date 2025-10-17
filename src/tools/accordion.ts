import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import {
	fetchComponentDocumentation,
	fetchComponentExamples,
	fetchComponentInstallation,
	fetchComponentSource,
} from "@/api/shadcn";

export function registerAccordionTools(server: McpServer) {
	// Helper tool to get component information
	server.tool(
		"get-accordion-info",
		"Get comprehensive information about the Shadcn Accordion component",
		{
			section: z
				.enum(["all", "documentation", "examples", "source", "installation"])
				.describe(
					"Which section of information to retrieve (default: all)",
				)
				.optional(),
		},
		async ({ section = "all" }) => {
			const results: string[] = [];

			if (section === "all" || section === "documentation") {
				const docs = await fetchComponentDocumentation("accordion");
				if (docs) {
					results.push(
						`# ${docs.name} Documentation\n\n${docs.description}\n\nFor full details, see the accordion-documentation resource.`,
					);
				}
			}

			if (section === "all" || section === "installation") {
				const install = await fetchComponentInstallation("accordion");
				results.push(
					`## Installation\n\n\`\`\`bash\n${install.cliCommand}\n\`\`\`\n\nFor full installation instructions, see the accordion-installation resource.`,
				);
			}

			if (section === "all" || section === "examples") {
				const examples = await fetchComponentExamples("accordion");
				if (examples.length > 0) {
					results.push(
						`## Examples\n\nFound ${examples.length} code example(s). See the accordion-example resource for full code.`,
					);
				}
			}

			if (section === "all" || section === "source") {
				const source = await fetchComponentSource("accordion");
				if (source) {
					results.push(
						`## Source Code\n\nComponent file: ${source.fileName}\n\nSee the accordion-source resource for the complete implementation.`,
					);
				}
			}

			const text = results.join("\n\n---\n\n");

			return {
				content: [
					{
						type: "text",
						text:
							text ||
							"No information available. Please check your internet connection.",
					},
				],
			};
		},
	);
}
