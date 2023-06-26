import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * calcHash.js
 *
 * Calculates SHA256 hash for file fileToCalculateHashFor.txt and logs it into console as hex
 * @param {string} relativeFilePath
 */
const calculateHash = async (relativeFilePath = 'files/fileToCalculateHashFor.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, relativeFilePath);

  fs.access(filePath, fs.F_OK, (accessError) => {
    if (accessError) throw new Error('FS operation failed');

    const hash = crypto.createHash('sha256');
    const fileStream = fs.createReadStream(filePath);

    fileStream.on('data', (data) => {
      hash.update(data);
    });

    fileStream.on('end', () => {
      const hashValue = hash.digest('hex');
      console.log(hashValue);
      return hashValue;
    });

    fileStream.on('error', (err) => {
      throw new Error(err);
    });
  });
};

await calculateHash();
