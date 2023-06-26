import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * read.js
 * Prints content of the fileToRead.txt into console
 * if there's no file fileToRead.txt Error with message "FS operation failed" must be thrown
 * @param {string} pathToFile
 */

const read = async (pathToFile = '/files/fileToRead.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, pathToFile);

  fs.access(filePath, fs.F_OK, (accessError) => {
    if (accessError) throw new Error('FS operation failed');

    return fs.readFile(filePath, (error, data) => {
      if (error) throw new Error(error);

      console.log(data.toString());
    });
  });
};

await read();
