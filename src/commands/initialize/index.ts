import { getPackage, getPackageParsed } from "../../utility/config.js";
import { ProjectConfiguration } from "./types.js";
import {
	Job,
	configureSvelteConfig,
	createConfigurationFile,
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
		startMessage: "Creating configuration file...",
		stopMessage: "Created configuration file.",
		task: () => createConfigurationFile(configuration),
	});

	jobs.push({
		startMessage: "Pages folder...",
		stopMessage: "Created pages folder.",
		task: () => createPagesDirectory(),
	});

	jobs.push({
		startMessage: "Configurating Svelte config...",
		stopMessage: "Configured Svelte config.",
		task: () => configureSvelteConfig(),
	});

	for (const job of jobs) {
		const spinner = createSpinner();
		spinner.start(job.startMessage);
		await job.task();
		spinner.stop(job.stopMessage);
	}
}
