export interface ComponentDocumentation {
	name: string;
	description: string;
	content: string;
}

export interface ComponentExample {
	title?: string;
	code: string;
	description?: string;
}

export interface ComponentInstallation {
	cliCommand: string;
	dependencies: string[];
	manualSteps?: string[];
}

export interface ComponentSource {
	fileName: string;
	code: string;
	imports?: string[];
}

export interface ShadcnComponent {
	name: string;
	slug: string;
	url: string;
}
