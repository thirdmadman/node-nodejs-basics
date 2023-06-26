import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * read.js
 * Reads file fileToRead.txt content using Readable Stream and
 * prints it's content into process.stdout
 *
 * @param {string} relativePathToFile
 */

const read = async (relativePathToFile = 'files/fileToRead.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, relativePathToFile);

  const readableStream = createReadStream(filePath);

  readableStream.on('error', (error) => {
    throw new Error(error);
  });

  readableStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });
};

await read();
