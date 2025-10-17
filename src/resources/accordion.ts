import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
	fetchComponentDocumentation,
	fetchComponentExamples,
	fetchComponentInstallation,
	fetchComponentSource,
} from "@/api/shadcn";

const COMPONENT_SLUG = "accordion";

export function registerAccordionResources(server: McpServer) {
	// Resource 1: Full Documentation
	server.resource(
		"accordion-documentation",
		`shadcn://component/${COMPONENT_SLUG}/documentation`,
		{
			description:
				"Complete documentation for the Accordion component from Shadcn/ui",
			mimeType: "text/markdown",
		},
		async () => {
			const docs = await fetchComponentDocumentation(COMPONENT_SLUG);

			if (!docs) {
				return {
					contents: [
						{
							uri: `shadcn://component/${COMPONENT_SLUG}/documentation`,
							mimeType: "text/plain",
							text: "Failed to fetch documentation. Please check your internet connection.",
						},
					],
				};
			}

			// Format the documentation nicely
			const formattedDocs = `# ${docs.name} Component

${docs.description}

## Overview

The Accordion component is a vertically stacked set of interactive headings that each reveal a section of content. It's built on Radix UI primitives and provides accessible, collapsible content sections.

## Documentation URL
https://ui.shadcn.com/docs/components/${COMPONENT_SLUG}

## Key Features
- Accessible (WAI-ARIA compliant)
- Configurable expansion behavior (single or multiple items)
- Responsive design support
- Tailwind CSS integration
- Flexible content composition

## Usage
The component can be used for FAQs, product information, settings panels, and any content that benefits from progressive disclosure.

For complete implementation details, code examples, and API reference, see the other accordion resources or visit the documentation URL above.
`;

			return {
				contents: [
					{
						uri: `shadcn://component/${COMPONENT_SLUG}/documentation`,
						mimeType: "text/markdown",
						text: formattedDocs,
					},
				],
			};
		},
	);

	// Resource 2: Code Examples
	server.resource(
		"accordion-example",
		`shadcn://component/${COMPONENT_SLUG}/example`,
		{
			description: "Working code examples for the Accordion component",
			mimeType: "text/plain",
		},
		async () => {
			const examples = await fetchComponentExamples(COMPONENT_SLUG);

			if (examples.length === 0) {
				return {
					contents: [
						{
							uri: `shadcn://component/${COMPONENT_SLUG}/example`,
							mimeType: "text/plain",
							text: "Failed to fetch examples. Using fallback example:\n\n" +
								`import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that can be customized.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
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
						uri: `shadcn://component/${COMPONENT_SLUG}/example`,
						mimeType: "text/markdown",
						text: `# Accordion Examples\n\n${examplesText}`,
					},
				],
			};
		},
	);

	// Resource 3: Component Source Code
	server.resource(
		"accordion-source",
		`shadcn://component/${COMPONENT_SLUG}/source`,
		{
			description: "Source code for the Accordion component from the registry",
			mimeType: "text/plain",
		},
		async () => {
			const source = await fetchComponentSource(COMPONENT_SLUG);

			if (!source) {
				return {
					contents: [
						{
							uri: `shadcn://component/${COMPONENT_SLUG}/source`,
							mimeType: "text/plain",
							text: "Failed to fetch component source code from the registry.",
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
						uri: `shadcn://component/${COMPONENT_SLUG}/source`,
						mimeType: "text/markdown",
						text: sourceText,
					},
				],
			};
		},
	);

	// Resource 4: Installation Instructions
	server.resource(
		"accordion-installation",
		`shadcn://component/${COMPONENT_SLUG}/installation`,
		{
			description: "Installation instructions for the Accordion component",
			mimeType: "text/markdown",
		},
		async () => {
			const installation = await fetchComponentInstallation(COMPONENT_SLUG);

			const installText = `# Installing the Accordion Component

## CLI Installation (Recommended)

\`\`\`bash
${installation.cliCommand}
\`\`\`

## Dependencies

${installation.dependencies.map((dep) => `- ${dep}`).join("\n")}

## Manual Installation Steps

${installation.manualSteps?.map((step, i) => `${i + 1}. ${step}`).join("\n")}

## After Installation

Once installed, you can import the component:

\`\`\`tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
\`\`\`

## Requirements

- A Next.js, Vite, or similar React project
- Tailwind CSS configured
- Shadcn/ui initialized in your project

If you haven't initialized shadcn/ui yet, run:

\`\`\`bash
npx shadcn@latest init
\`\`\`
`;

			return {
				contents: [
					{
						uri: `shadcn://component/${COMPONENT_SLUG}/installation`,
						mimeType: "text/markdown",
						text: installText,
					},
				],
			};
		},
	);
}
