import { confirm, group, select, text } from "@clack/prompts";
import { getPackageJson } from "../../utility/config.js";
import { prompt } from "../../utility/prompt.js";
import { ProjectConfiguration } from "./types.js";
import { promises as fs } from 'fs';
import { join } from "path";
import { userDir } from "../../utility/dir.js";

export async function initialize() {

	const configuration = await getConfigurationUserInput();
  await create(configuration);  
}

async function getConfigurationUserInput(): Promise<ProjectConfiguration> {
	return {
		information: await group({
			name: async () =>
				await prompt(text, {
					message: "Please enter the name of your project:",
					placeholder: (await getPackageJson()).name,
					defaultValue: (await getPackageJson()).name,
				}),
		}),
		layout: await group({
			search: async () =>
				await prompt(confirm, {
					message: "Do you want to include search? (Uses Pagefind)"
			  }),
			toc: async () =>
				await prompt(confirm, {
					message: "Do you want to include a table of contents?",
				})
		}),
		theme: await group({
			default: async () =>
				await prompt(select, {
					message: "What should the default theme be?",
					options: [
						{
							value: "dark",
							label: "Dark",
						},
						{
							value: "light",
							label: "Light",
						},
					],
				}),
			switchable: async () =>
				await prompt(confirm, {
					message: "Should the theme be switchable?"
				}),
		}),
	};
}

async function create(configuration: ProjectConfiguration) {
  await fs.writeFile(join(userDir(), 'docukit.config.json'), JSON.stringify(configuration, null, 2));
}
