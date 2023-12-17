import { initialize } from "./initialize/index.js";
import { intro, outro } from "@clack/prompts";

export type CommandOptions = {
	startMessage: string;
	command: () => Promise<void>;
	endMessage: string;
};

export function command({ startMessage, command, endMessage }: CommandOptions) {
	return async () => {
		intro(startMessage);
		await command();
		outro(endMessage);
	};
}

export const commands = {
	initialize: {
		startMessage: "Welcome to Docukit initialize!",
		command: initialize,
		endMessage: "Finished initializing Docukit!",
	},
};
