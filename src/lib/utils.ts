/**
 * Utility functions for the Shadcn MCP server
 */

/**
 * Extracts clean text from HTML content
 */
export function extractTextFromHtml(html: string): string {
	// Remove script and style tags
	let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
	text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");

	// Remove HTML tags
	text = text.replace(/<[^>]+>/g, " ");

	// Decode HTML entities
	text = text
		.replace(/&nbsp;/g, " ")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&amp;/g, "&");

	// Clean up whitespace
	text = text.replace(/\s+/g, " ").trim();

	return text;
}

/**
 * Formats a component name for display
 */
export function formatComponentName(slug: string): string {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}
