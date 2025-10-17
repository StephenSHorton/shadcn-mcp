import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerAccordionPrompts(server: McpServer) {
	// Prompt 1: Implementation Guidance
	server.prompt(
		"implement-accordion",
		"Guide for implementing the Shadcn Accordion component",
		async () => {
			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I want to implement the Shadcn Accordion component in my React project. Please guide me through:

1. Installation using the Shadcn CLI
2. Basic usage with a simple example
3. Common props and configuration options
4. Best practices for accessibility

Please provide step-by-step instructions and working code examples.`,
						},
					},
				],
			};
		},
	);

	// Prompt 2: Customization Assistance
	server.prompt(
		"customize-accordion",
		"Help customize the Accordion component styling and behavior",
		async () => {
			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I have a Shadcn Accordion component and I want to customize it. Please help me with:

1. How to modify the styling (colors, borders, spacing, animations)
2. How to control the expand/collapse behavior (single vs multiple, default open)
3. How to add custom icons or indicators
4. How to integrate with form state or other React hooks
5. How to make it work with dynamic content

Please provide practical examples showing how to customize these aspects while maintaining accessibility.`,
						},
					},
				],
			};
		},
	);

	// Prompt 3: Troubleshooting
	server.prompt(
		"troubleshoot-accordion",
		"Debug common Accordion component issues",
		async () => {
			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I'm having issues with my Shadcn Accordion component. Please help me troubleshoot common problems:

1. The accordion is not expanding/collapsing
2. Styling is not being applied correctly
3. Animations are not smooth or are missing
4. Multiple items are expanding when type="single"
5. The component is not accessible (keyboard navigation issues)
6. TypeScript errors with props
7. Conflicts with other components or global styles

Please provide debugging steps and solutions for these common issues.`,
						},
					},
				],
			};
		},
	);

	// Prompt 4: Best Practices
	server.prompt(
		"accordion-best-practices",
		"Learn best practices and patterns for the Accordion component",
		async () => {
			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Please teach me the best practices for using the Shadcn Accordion component:

1. **Accessibility**: How to ensure the accordion is fully accessible (ARIA attributes, keyboard navigation, screen readers)
2. **Performance**: Best practices for accordions with many items or dynamic content
3. **UX Patterns**: When to use single vs multiple expansion, default states, and interaction patterns
4. **Content Organization**: How to structure content within accordion items effectively
5. **Responsive Design**: Making accordions work well on mobile and desktop
6. **Common Use Cases**: FAQ sections, settings panels, product details, step-by-step guides
7. **Integration**: Working with forms, data fetching, and state management

Please provide examples and explain the reasoning behind each best practice.`,
						},
					},
				],
			};
		},
	);
}
