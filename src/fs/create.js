import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const create = async (data = 'I am fresh and young', fileRelativePath = 'files', fileName = 'fresh.txt') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, fileRelativePath, fileName);

  fs.access(filePath, fs.F_OK, (accessError) => {
    if (!accessError) throw new Error('FS operation failed');

    return fs.writeFile(filePath, data, { encoding: 'utf-8', flag: 'w' }, (writeError) => {
      if (writeError) throw new Error(writeError);
    });
  });
};

await create();
