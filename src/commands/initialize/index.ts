import { getPackageParsed } from "../../utility/config.js";
import { ProjectConfiguration } from "./types.js";
import {
	Job,
	configureSvelteConfig,
	createConfigurationFile,
	createMdsvexConfig,
	createPagesDirectory,
} from "./jobs.js";
import {
	text,
	confirm,
	isCancel,
	spinner as createSpinner,
} from "@clack/prompts";
import { abort } from "../../utility/abort.js";

export async function initialize() {
	const configuration = await getConfigurationUserInput();
	await create(configuration);
}

async function getConfigurationUserInput(): Promise<ProjectConfiguration> {
	const name = await text({
		message: "Please enter the name of your project:",
		placeholder: (await getPackageParsed()).name,
		defaultValue: (await getPackageParsed()).name,
	});
	if (isCancel(name)) {
		return abort("User canceled the operation.");
	}

	const search = await confirm({
		message:
			"Do you want to include search? (Through Pagefind: https://pagefind.app/)",
	});
	if (isCancel(search)) {
		return abort("User canceled the operation.");
	}

	const toc = await confirm({
		message: "Do you want to include a table of contents?",
	});
	if (isCancel(toc)) {
		return abort("User canceled the operation.");
	}

	return {
		name,
		search,
		toc,
	};
}
async function create(configuration: ProjectConfiguration) {
	const jobs: Job[] = [];

	jobs.push({
		startMessage: "Creating Docukit config...",
		stopMessage: "Successfully created Docukit config.",
		task: () => createConfigurationFile(configuration),
	});

	jobs.push({
		startMessage: "Creating Mdsvex config...",
		stopMessage: "Successfully created Mdsvex config.",
		task: () => createMdsvexConfig(),
	});

	jobs.push({
		startMessage: "Creating Svelte config...",
		stopMessage: "Successfully created Svelte config.",
		task: () => configureSvelteConfig(),
	});

	jobs.push({
		startMessage: "Creating pages directory...",
		stopMessage: "Successfully created pages directory.",
		task: () => createPagesDirectory(),
	});

	for (const job of jobs) {
		const spinner = createSpinner();
		spinner.start(job.startMessage);
		await job.task();
		spinner.stop(job.stopMessage);
	}
}
