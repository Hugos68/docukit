import { dirname, join } from "path";

export function packageDir() {
	const __dirname = dirname(new URL(import.meta.url).pathname);
	return join(__dirname, "..");
}

export function userDir() {
	return process.cwd();
}
