import { red } from "colorette";

export function abort(reason?: string) {
    const output = reason ? `Operation canceled, reason: ${reason}` : 'Operation canceled.';
    console.error(red(output));
    process.exit(0);
};