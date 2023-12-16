import { intro, outro } from "@clack/prompts";
import { initialize } from "./initialize/index.js";

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
    }
}

export const commands = {
    initialize: {
        startMessage: "Welcome to Docukit initialize!",
        command: initialize,
        endMessage: "Finished initializing Docukit!"
    }
}