import { join } from "path";
import { ProjectConfiguration } from "./types.js";
import { promises as fs } from "fs";
import { userDir } from "../../utility/dir.js";
import { getSvelteConfig } from "../../utility/config.js";
import { parse } from "@babel/parser";

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

export async function createPagesDirectory() {
	await fs.mkdir(join(userDir(), "src", "pages"), { recursive: true });
}

export async function configureSvelteConfig() {
	const svelteConfigRaw = await getSvelteConfig();
	const svelteConfig = parse(svelteConfigRaw, { sourceType: "module" });
	console.log(svelteConfig.program.body)
}
