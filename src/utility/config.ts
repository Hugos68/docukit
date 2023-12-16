import { promises as fs } from 'fs';
import { userDir } from './dir.js';
import { join } from 'path';
import { red } from 'colorette';

export function getPackageJson() {
    return fs.readFile(join(userDir(), 'package.json'), 'utf-8').then(JSON.parse).catch(() => {
        console.log(red(`No package.json found in the current directory: "${userDir()}", make sure you are in the root of your project.`))
        process.exit(1);
    })
}