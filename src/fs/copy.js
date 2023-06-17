import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Brief copy.js
 * implement function that copies folder files files with all its content,
 * into folder files_copy at the same level
 *
 * If files folder doesn't exists or files_copy has already been created ->
 * Error with message "FS operation failed" must be thrown
 *
 * @param {string} relativePathSrc
 * @param {string} relativePathDist
 */

const copy = async (relativePathSrc = 'files', relativePathDist = 'files_copy') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const srcPath = path.join(dirname, relativePathSrc);
  const distPath = path.join(dirname, relativePathDist);

  fs.access(srcPath, fs.F_OK, (accessError) => {
    if (accessError) throw new Error('FS operation failed');
  });

  fs.access(distPath, fs.F_OK, (accessError) => {
    if (!accessError) throw new Error('FS operation failed');
  });

  return fs.cp(srcPath, distPath, { recursive: true }, (err) => { if (err) throw err; });
};

await copy();
