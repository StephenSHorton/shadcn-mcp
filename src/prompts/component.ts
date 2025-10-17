import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export function registerComponentPrompts(server: McpServer) {
	// Prompt 1: Implementation Guidance
	server.prompt(
		"implement-component",
		"Guide for implementing any Shadcn component",
		{
			component: z
				.string()
				.describe("Component slug (e.g., button, dialog, accordion)"),
		},
		async ({ component }) => {
			const componentName =
				component.charAt(0).toUpperCase() + component.slice(1);

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I want to implement the Shadcn ${componentName} component in my React project. Please guide me through:

1. Installation using the Shadcn CLI
2. Basic usage with a simple example
3. Common props and configuration options
4. Best practices for accessibility

Please provide step-by-step instructions and working code examples for the ${component} component.`,
						},
					},
				],
			};
		},
	);

	// Prompt 2: Customization Assistance
	server.prompt(
		"customize-component",
		"Help customize any Shadcn component styling and behavior",
		{
			component: z
				.string()
				.describe("Component slug (e.g., button, dialog, accordion)"),
		},
		async ({ component }) => {
			const componentName =
				component.charAt(0).toUpperCase() + component.slice(1);

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I have a Shadcn ${componentName} component and I want to customize it. Please help me with:

1. How to modify the styling (colors, borders, spacing, animations)
2. How to control the behavior and interactions
3. How to add custom functionality or variants
4. How to integrate with form state or other React hooks
5. How to make it work with dynamic content

Please provide practical examples showing how to customize the ${component} component while maintaining accessibility.`,
						},
					},
				],
			};
		},
	);

	// Prompt 3: Troubleshooting
	server.prompt(
		"troubleshoot-component",
		"Debug common issues with any Shadcn component",
		{
			component: z
				.string()
				.describe("Component slug (e.g., button, dialog, accordion)"),
		},
		async ({ component }) => {
			const componentName =
				component.charAt(0).toUpperCase() + component.slice(1);

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `I'm having issues with my Shadcn ${componentName} component. Please help me troubleshoot common problems:

1. The component is not rendering correctly
2. Styling is not being applied as expected
3. Interactions or animations are not working
4. TypeScript errors with props or types
5. Conflicts with other components or global styles
6. Accessibility issues (keyboard navigation, screen readers)
7. Integration issues with forms or state management

Please provide debugging steps and solutions for common ${component} component issues.`,
						},
					},
				],
			};
		},
	);

	// Prompt 4: Best Practices
	server.prompt(
		"component-best-practices",
		"Learn best practices and patterns for any Shadcn component",
		{
			component: z
				.string()
				.describe("Component slug (e.g., button, dialog, accordion)"),
		},
		async ({ component }) => {
			const componentName =
				component.charAt(0).toUpperCase() + component.slice(1);

			return {
				messages: [
					{
						role: "user",
						content: {
							type: "text",
							text: `Please teach me the best practices for using the Shadcn ${componentName} component:

1. **Accessibility**: How to ensure the component is fully accessible (ARIA attributes, keyboard navigation, screen readers)
2. **Performance**: Best practices for optimal performance
3. **UX Patterns**: When and how to use this component effectively
4. **Content Organization**: How to structure content within the component
5. **Responsive Design**: Making it work well on mobile and desktop
6. **Common Use Cases**: Real-world examples and patterns
7. **Integration**: Working with forms, data fetching, and state management

Please provide examples and explain the reasoning behind each best practice for the ${component} component.`,
						},
					},
				],
			};
		},
	);
}
