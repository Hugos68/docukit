import { confirm, isCancel, multiselect, select, text } from '@clack/prompts';
import { abort } from './abort.js';

export type PromptFunction = typeof text | typeof confirm | typeof select | typeof multiselect;
export type PromptOptions<T extends PromptFunction> = Parameters<T>[0];

export async function prompt<T extends PromptFunction>(promptFunction: T , promptOptions: Parameters<T>[0]) {
    const value = await promptFunction(promptOptions);
    processPossibleCancel(value);
    return value
}

function processPossibleCancel(value: unknown) {
    if (isCancel(value)) {
        abort('User canceled the operation.');
        process.exit(0);
    }
}