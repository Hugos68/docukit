import { promises as fs } from 'fs';
import { userDir } from './dir.js';
import { join } from 'path';

export function getPackageJson() {
    return fs.readFile(join(userDir(), 'package.json'), 'utf-8').then(JSON.parse);
}