import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
	fetchComponentDocumentation,
	fetchComponentExamples,
	fetchComponentInstallation,
	fetchComponentSource,
	fetchAllComponents,
} from "@/api/shadcn";

export function registerComponentResources(server: McpServer) {
	// Resource template for component documentation
	server.resource(
		"component-documentation",
		new ResourceTemplate(
			"shadcn://component/{component}/documentation",
			{
				list: async () => {
					const components = await fetchAllComponents();
					return {
						resources: components.map((comp) => ({
							uri: `shadcn://component/${comp.slug}/documentation`,
							name: `${comp.name} Documentation`,
							description: `Complete documentation for the ${comp.name} component from Shadcn/ui`,
							mimeType: "text/markdown",
						})),
					};
				},
			},
		),
		{
			description: "Documentation for Shadcn/ui components",
			mimeType: "text/markdown",
		},
		async (uri, variables) => {
			const component = variables.component as string;
			const docs = await fetchComponentDocumentation(component);

			if (!docs) {
				return {
					contents: [
						{
							uri: uri.toString(),
							mimeType: "text/plain",
							text: `Failed to fetch documentation for ${component}. Please check your internet connection.`,
						},
					],
				};
			}

			const formattedDocs = `# ${docs.name} Component

${docs.description}

## Overview

The ${docs.name} component is part of the Shadcn/ui library. Visit the documentation for complete details on usage, props, and examples.

## Documentation URL
https://ui.shadcn.com/docs/components/${component}

## Installation

\`\`\`bash
npx shadcn@latest add ${component}
\`\`\`

For complete implementation details, code examples, and API reference, visit the documentation URL above or use the other ${component} resources.
`;

			return {
				contents: [
					{
						uri: uri.toString(),
						mimeType: "text/markdown",
						text: formattedDocs,
					},
				],
			};
		},
	);

	// Resource template for component examples
	server.resource(
		"component-example",
		new ResourceTemplate(
			"shadcn://component/{component}/example",
			{
				list: async () => {
					const components = await fetchAllComponents();
					return {
						resources: components.map((comp) => ({
							uri: `shadcn://component/${comp.slug}/example`,
							name: `${comp.name} Examples`,
							description: `Working code examples for the ${comp.name} component`,
							mimeType: "text/markdown",
						})),
					};
				},
			},
		),
		{
			description: "Code examples for Shadcn/ui components",
			mimeType: "text/markdown",
		},
		async (uri, variables) => {
			const component = variables.component as string;
			const examples = await fetchComponentExamples(component);

			if (examples.length === 0) {
				return {
					contents: [
						{
							uri: uri.toString(),
							mimeType: "text/plain",
							text: `No examples found for ${component}. Visit https://ui.shadcn.com/docs/components/${component} for documentation.`,
						},
					],
				};
			}

			const examplesText = examples
				.map((example, index) => {
					let text = "";
					if (example.title) {
						text += `## ${example.title}\n\n`;
					} else {
						text += `## Example ${index + 1}\n\n`;
					}
					if (example.description) {
						text += `${example.description}\n\n`;
					}
					text += `\`\`\`tsx\n${example.code}\n\`\`\`\n\n`;
					return text;
				})
				.join("\n---\n\n");

			return {
				contents: [
					{
						uri: uri.toString(),
						mimeType: "text/markdown",
						text: `# ${component.charAt(0).toUpperCase() + component.slice(1)} Examples\n\n${examplesText}`,
					},
				],
			};
		},
	);

	// Resource template for component source code
	server.resource(
		"component-source",
		new ResourceTemplate(
			"shadcn://component/{component}/source",
			{
				list: async () => {
					const components = await fetchAllComponents();
					return {
						resources: components.map((comp) => ({
							uri: `shadcn://component/${comp.slug}/source`,
							name: `${comp.name} Source`,
							description: `Source code for the ${comp.name} component from the registry`,
							mimeType: "text/markdown",
						})),
					};
				},
			},
		),
		{
			description: "Source code for Shadcn/ui components",
			mimeType: "text/markdown",
		},
		async (uri, variables) => {
			const component = variables.component as string;
			const source = await fetchComponentSource(component);

			if (!source) {
				return {
					contents: [
						{
							uri: uri.toString(),
							mimeType: "text/plain",
							text: `Failed to fetch source code for ${component} from the registry.`,
						},
					],
				};
			}

			let sourceText = `# ${source.fileName}\n\n`;
			if (source.imports && source.imports.length > 0) {
				sourceText += `## Dependencies\n${source.imports.map((dep) => `- ${dep}`).join("\n")}\n\n`;
			}
			sourceText += `## Source Code\n\n\`\`\`tsx\n${source.code}\n\`\`\``;

			return {
				contents: [
					{
						uri: uri.toString(),
						mimeType: "text/markdown",
						text: sourceText,
					},
				],
			};
		},
	);

	// Resource template for component installation
	server.resource(
		"component-installation",
		new ResourceTemplate(
			"shadcn://component/{component}/installation",
			{
				list: async () => {
					const components = await fetchAllComponents();
					return {
						resources: components.map((comp) => ({
							uri: `shadcn://component/${comp.slug}/installation`,
							name: `${comp.name} Installation`,
							description: `Installation instructions for the ${comp.name} component`,
							mimeType: "text/markdown",
						})),
					};
				},
			},
		),
		{
			description: "Installation instructions for Shadcn/ui components",
			mimeType: "text/markdown",
		},
		async (uri, variables) => {
			const component = variables.component as string;
			const installation = await fetchComponentInstallation(component);

			const componentName =
				component.charAt(0).toUpperCase() + component.slice(1);

			const installText = `# Installing the ${componentName} Component

## CLI Installation (Recommended)

\`\`\`bash
${installation.cliCommand}
\`\`\`

## Requirements

- A Next.js, Vite, or similar React project
- Tailwind CSS configured
- Shadcn/ui initialized in your project

If you haven't initialized shadcn/ui yet, run:

\`\`\`bash
npx shadcn@latest init
\`\`\`

## After Installation

The component will be added to your project in \`components/ui/${component}.tsx\`. You can then import and use it:

\`\`\`tsx
import { ${componentName} } from "@/components/ui/${component}"
\`\`\`

## Documentation

For full usage details, visit: https://ui.shadcn.com/docs/components/${component}
`;

			return {
				contents: [
					{
						uri: uri.toString(),
						mimeType: "text/markdown",
						text: installText,
					},
				],
			};
		},
	);
}
