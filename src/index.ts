#!/usr/bin/env node
import { Command } from "commander";
import { getPackageJson } from "./utility/config.js";
import { command, commands } from "./commands/command.js";

async function main() {
    const packageJson = await getPackageJson();

    const program = new Command()
        .name('docukit')
        .version(packageJson.version)
        .description(packageJson.description)
        .usage('<command>');

    program
        .command('initialize')
        .alias('init')
        .description('Initialize docukit')
        .action(command(commands.initialize));
    
    program.parse(process.argv);
}

await main();