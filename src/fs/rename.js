import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * brief rename.js
 * Renames file wrongFilename.txt to properFilename with extension .md
 *
 * if there's no file wrongFilename.txt or properFilename.md already exists
 * Error with message "FS operation failed" must be thrown
 *
 * @param {string} srcFileName
 * @param {string} distFilename
 */

const rename = async (srcFileName = 'files/wrongFilename.txt', distFilename = 'files/properFilename.md') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const srcFile = path.join(dirname, srcFileName);
  const distFile = path.join(dirname, distFilename);

  fs.access(srcFile, fs.F_OK, (accessError) => {
    if (accessError) throw new Error('FS operation failed');
  });

  fs.access(distFile, fs.F_OK, (accessError) => {
    if (!accessError) throw new Error('FS operation failed');
  });

  return fs.rename(srcFile, distFile, (err) => { if (err) throw err; });
};

await rename();
