import { join } from "path";
import { ProjectConfiguration } from "./types.js";
import { promises as fs } from "fs";
import { userDir } from "../../utility/dir.js";
import {
	getMdsvexConfigTemplate,
	getSvelteConfigTemplate,
} from "../../utility/config.js";

export type Job = {
	startMessage: string;
	stopMessage: string;
	task: () => unknown;
};

export async function createConfigurationFile(
	configuration: ProjectConfiguration,
) {
	await fs.writeFile(
		join(userDir(), "docukit.config.json"),
		JSON.stringify(configuration, null, 2),
	);
}

export async function createMdsvexConfig() {
	const mdsvexConfigTemplate = await getMdsvexConfigTemplate();
	console.log(mdsvexConfigTemplate)
	await fs.writeFile(join(userDir(), "mdsvex.config.js"), mdsvexConfigTemplate);
}

export async function configureSvelteConfig() {
	const svelteConfigTemplate = await getSvelteConfigTemplate();
	await fs.writeFile(join(userDir(), "svelte.config.js"), svelteConfigTemplate);
}

export async function createPagesDirectory() {
	await fs.mkdir(join(userDir(), "src", "pages"), { recursive: true });
}
