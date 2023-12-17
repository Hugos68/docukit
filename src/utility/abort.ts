import { red } from "colorette";

export function abort(reason?: string) {
    const message = reason ? `${reason}` : 'Operation canceled.';
    console.error(red(message));
    return process.exit(0);
};