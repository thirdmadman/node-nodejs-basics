import { createWriteStream } from 'fs';

import path from 'path';
import { fileURLToPath } from 'url';

/**
 * write.js
 * Writes process.stdin data into file fileToWrite.txt content using Writable Stream
 * @param {string} relativePathToFile
 */

const write = async (relativePathToFile = 'files/fileToWrite.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, relativePathToFile);

  const fileStream = createWriteStream(filePath, { flags: 'w' });

  process.stdin.pipe(fileStream);
};

await write();
