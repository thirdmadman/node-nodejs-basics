import path from 'path';
import { release, version } from 'os';
import http from 'http';
import { fileURLToPath } from 'url';
import fileA from './files/a.json' assert { type: "json" };
import fileB from './files/b.json' assert { type: "json" };

import './files/c.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const filename = fileURLToPath(import.meta.url);

const random = Math.random();

let unknownObjectRand;

if (random > 0.5) {
  unknownObjectRand = fileA;
} else {
  unknownObjectRand = fileB;
}

export const unknownObject = unknownObjectRand;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${filename}`);
console.log(`Path to current directory is ${dirname}`);

export const myServer = http.createServer((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObjectRand);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});
