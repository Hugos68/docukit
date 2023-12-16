#!/usr/bin/env node
import { Command } from "commander";
import { initialize } from "./commands/initialize.js";

const program = new Command();

program.command('initialize').alias('init').description('Initialize docukit').action(initialize);

program.parse(process.argv);