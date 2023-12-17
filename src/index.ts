#!/usr/bin/env node
import { Command } from "commander";
import { getPackageParsed } from "./utility/config.js";
import { command, commands } from "./commands/index.js";

async function main() {
	const packageJson = await getPackageParsed();

	const program = new Command()
		.name("docukit")
		.version(packageJson.version)
		.description(packageJson.description)
		.usage("<command>");

	program
		.command("initialize")
		.alias("init")
		.description("Initialize docukit")
		.action(command(commands.initialize));

	program.parse(process.argv);
}

await main();
