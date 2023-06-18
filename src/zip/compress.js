import { createGzip } from 'zlib';
import { createWriteStream, createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * compress.js
 * Compresses file fileToCompress.txt to archive.gz using zlib and Streams API
 *
 * @param {string} relativePathToFile
 */

const compress = async (relativePathToFile = 'files/fileToCompress.txt', relativeOutputFilePath = 'files/archive.gz') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, relativePathToFile);
  const outputFilePath = path.join(dirname, relativeOutputFilePath);

  const compressOutputStream = createWriteStream(outputFilePath);
  const inputFileStream = createReadStream(filePath);

  inputFileStream.pipe(createGzip()).pipe(compressOutputStream);
};

await compress();
