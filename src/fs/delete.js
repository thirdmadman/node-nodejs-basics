import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * delete.js
 * Deletes file fileToRemove.txt
 * if there's no file fileToRemove.txt Error with message "FS operation failed must" be thrown
 *
 * @param {string} pathToFile
 */

const remove = async (pathToFile = 'files/fileToRemove.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, pathToFile);

  fs.access(filePath, fs.F_OK, (accessError) => {
    if (accessError) throw new Error('FS operation failed');

    return fs.unlink(filePath, (error) => {
      if (error) throw new Error(error);
    });
  });
};

await remove();
