import { confirm, isCancel, multiselect, select, text } from '@clack/prompts';
import { abort } from './abort.js';

export type Prompt = typeof text | typeof confirm | typeof select | typeof multiselect;

export async function prompt<T extends Prompt>(promptFunction: T, promptOptions: Parameters<T>[0]) {
    const value = await promptFunction(promptOptions);
    processPossibleCancel(value);
    return value;
}

function processPossibleCancel(value: unknown) {
    if (isCancel(value)) {
        abort('User canceled the operation.');
        process.exit(0);
    }
}