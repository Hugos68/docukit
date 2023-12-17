import { promises as fs } from "fs";
import { userDir } from "./dir.js";
import { join } from "path";
import { abort } from "./abort.js";

export async function getPackage() {
	try {
		const content = await fs.readFile(
			join(userDir(), "package.json"),
			"utf-8",
		);
		return content;
	} catch {
		return abort(
			`No package.json found in the current directory: "${userDir()}", make sure you are in the root of your project.`,
		);
	}
}

export async function getPackageParsed() {
	const content = await getPackage();
	return JSON.parse(content);
}

export async function getSvelteConfig() {
	try {
		return fs.readFile(join(userDir(), "svelte.config.js"), "utf-8");
	} catch {
		return abort(
			`No svelte.config.js found in the current directory: "${userDir()}", make sure you are in the root of your project.`,
		);
	}
}
