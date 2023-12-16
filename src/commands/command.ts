import { intro } from "@clack/prompts";
import { initialize } from "./initialize.js";

export type CommandOptions = {
    startMessage: string;
    command: () => Promise<void>;
    endMessage: string;
};

export function command({ startMessage, command, endMessage }: CommandOptions) {
    return async () => {
        intro(startMessage);
        await command();
        intro(endMessage);
    }
}

export const commands = {
    initialize: {
        startMessage: "Welcome to Docukit initialize!",
        command: initialize,
        endMessage: "Finished initializing Docukit!"
    }
}