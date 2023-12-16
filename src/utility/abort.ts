import { red } from "colorette";

export function abort(reason?: string) {
    const message = reason ? `Operation canceled, reason: ${reason}` : 'Operation canceled.';
    console.error(red(message));
    process.exit(0);
};