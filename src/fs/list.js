import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * list.js
 * Prints all array of filenames from files folder into console
 * if files folder doesn't exists Error with message "FS operation failed" must be thrown
 *
 * @param {string} relativePathToDir
 */

const list = async (relativePathToDir = 'files') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const dirPath = path.join(dirname, relativePathToDir);

  fs.access(dirPath, fs.F_OK, (accessError) => {
    if (accessError) throw new Error('FS operation failed');
  });

  fs.readdir(dirPath, (error, files) => {
    if (error) throw new Error('FS operation failed');

    files.forEach((file) => {
      console.log(file);
    });
  });
};

await list();
