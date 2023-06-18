import { createGunzip } from 'zlib';
import { createWriteStream, createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * decompress.js
 * Decompresses archive.gz back to the fileToCompress.txt
 * with same content as before compression using zlib and Streams API
 * @param {string} relativePathToFile
 */

const decompress = async (relativePathToFile = 'files/archive.gz', relativeOutputFilePath = 'files/fileToCompress.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, relativePathToFile);
  const outputFilePath = path.join(dirname, relativeOutputFilePath);

  const decompressOutputStream = createWriteStream(outputFilePath);
  const compressedInputFileStream = createReadStream(filePath);

  compressedInputFileStream.pipe(createGunzip()).pipe(decompressOutputStream);
};

await decompress();
