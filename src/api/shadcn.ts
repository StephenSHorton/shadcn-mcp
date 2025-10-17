import type {
	ComponentDocumentation,
	ComponentExample,
	ComponentInstallation,
	ComponentSource,
	ShadcnComponent,
} from "@/types";

const SHADCN_DOCS_BASE = "https://ui.shadcn.com";
const SHADCN_REGISTRY_BASE =
	"https://ui.shadcn.com/registry/styles/default";

/**
 * Fetches the full documentation for a component
 */
export async function fetchComponentDocumentation(
	componentSlug: string,
): Promise<ComponentDocumentation | null> {
	try {
		const url = `${SHADCN_DOCS_BASE}/docs/components/${componentSlug}`;
		const response = await fetch(url);

		if (!response.ok) {
			console.error(`Failed to fetch documentation: ${response.status}`);
			return null;
		}

		const html = await response.text();

		// Extract the main content (basic parsing)
		// In a production system, you'd use a proper HTML parser
		const name = componentSlug.charAt(0).toUpperCase() + componentSlug.slice(1);
		const descMatch = html.match(
			/<meta\s+name="description"\s+content="([^"]+)"/i,
		);
		const description = descMatch?.[1] ?? `${name} component`;

		return {
			name,
			description,
			content: html, // Store full HTML for now, we can parse it more in resources
		};
	} catch (error) {
		console.error(`Error fetching documentation for ${componentSlug}:`, error);
		return null;
	}
}

/**
 * Fetches code examples for a component
 */
export async function fetchComponentExamples(
	componentSlug: string,
): Promise<ComponentExample[]> {
	try {
		const url = `${SHADCN_DOCS_BASE}/docs/components/${componentSlug}`;
		const response = await fetch(url);

		if (!response.ok) {
			return [];
		}

		const html = await response.text();

		// Extract code blocks - this is a simplified extraction
		// In production, you'd parse the HTML properly
		const codeBlocks: ComponentExample[] = [];
		const codeRegex = /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g;
		let match: RegExpExecArray | null;

		while ((match = codeRegex.exec(html)) !== null) {
			const code = (match[1] ?? "")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")
				.replace(/&amp;/g, "&");

			codeBlocks.push({
				code: code.trim(),
			});
		}

		return codeBlocks;
	} catch (error) {
		console.error(`Error fetching examples for ${componentSlug}:`, error);
		return [];
	}
}

/**
 * Fetches the component source code from the registry
 */
export async function fetchComponentSource(
	componentSlug: string,
): Promise<ComponentSource | null> {
	try {
		const url = `${SHADCN_REGISTRY_BASE}/${componentSlug}.json`;
		const response = await fetch(url);

		if (!response.ok) {
			console.error(`Failed to fetch component source: ${response.status}`);
			return null;
		}

		const data = (await response.json()) as {
			files?: Array<{ name?: string; content?: string }>;
			dependencies?: string[];
		};

		// The registry returns the component files
		if (data.files && data.files.length > 0) {
			const mainFile = data.files[0];
			return {
				fileName: mainFile?.name ?? `${componentSlug}.tsx`,
				code: mainFile?.content ?? "",
				imports: data.dependencies ?? [],
			};
		}

		return null;
	} catch (error) {
		console.error(`Error fetching source for ${componentSlug}:`, error);
		return null;
	}
}

/**
 * Gets installation information for a component
 */
export async function fetchComponentInstallation(
	componentSlug: string,
): Promise<ComponentInstallation> {
	// For Shadcn components, the installation is standardized
	return {
		cliCommand: `npx shadcn@latest add ${componentSlug}`,
		dependencies: ["@radix-ui/react-*"], // This would need to be component-specific
		manualSteps: [
			"Ensure you have initialized shadcn-ui in your project",
			"Run the CLI command to add the component",
			"Import and use the component in your code",
		],
	};
}

/**
 * Fetches the list of all available Shadcn components
 */
export async function fetchAllComponents(): Promise<ShadcnComponent[]> {
	try {
		const url = `${SHADCN_DOCS_BASE}/docs/components`;
		const response = await fetch(url);

		if (!response.ok) {
			console.error(`Failed to fetch components list: ${response.status}`);
			return getDefaultComponentsList();
		}

		const html = await response.text();

		// Extract component links from the page
		// Pattern: /docs/components/[slug]
		const componentRegex = /href="\/docs\/components\/([^"]+)"/g;
		const components = new Set<string>();
		let match: RegExpExecArray | null;

		while ((match = componentRegex.exec(html)) !== null) {
			const slug = match[1] ?? "";
			// Filter out non-component pages
			if (
				slug &&
				!slug.includes("#") &&
				slug !== "index" &&
				slug !== "installation"
			) {
				components.add(slug);
			}
		}

		return Array.from(components)
			.sort()
			.map((slug) => ({
				name: slug
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" "),
				slug,
				url: `${SHADCN_DOCS_BASE}/docs/components/${slug}`,
			}));
	} catch (error) {
		console.error("Error fetching components list:", error);
		return getDefaultComponentsList();
	}
}

/**
 * Returns a hardcoded list of components as fallback
 */
function getDefaultComponentsList(): ShadcnComponent[] {
	const components = [
		"accordion",
		"alert",
		"alert-dialog",
		"aspect-ratio",
		"avatar",
		"badge",
		"breadcrumb",
		"button",
		"button-group",
		"calendar",
		"card",
		"carousel",
		"chart",
		"checkbox",
		"collapsible",
		"combobox",
		"command",
		"context-menu",
		"data-table",
		"date-picker",
		"dialog",
		"drawer",
		"dropdown-menu",
		"empty",
		"field",
		"form",
		"hover-card",
		"input",
		"input-group",
		"input-otp",
		"item",
		"kbd",
		"label",
		"menubar",
		"navigation-menu",
		"pagination",
		"popover",
		"progress",
		"radio-group",
		"resizable",
		"scroll-area",
		"select",
		"separator",
		"sheet",
		"sidebar",
		"skeleton",
		"slider",
		"sonner",
		"spinner",
		"switch",
		"table",
		"tabs",
		"textarea",
		"toast",
		"toggle",
		"toggle-group",
		"tooltip",
		"typography",
	];

	return components.map((slug) => ({
		name: slug
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" "),
		slug,
		url: `${SHADCN_DOCS_BASE}/docs/components/${slug}`,
	}));
}
