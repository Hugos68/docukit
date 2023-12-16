import { text as clackText, isCancel, type TextOptions } from '@clack/prompts';

export async function text(options: TextOptions) {
    const value = await clackText(options);
    if (isCancel(value)) {
        console.log('Cancelled');
        process.exit(0);
    }
    return value;
}