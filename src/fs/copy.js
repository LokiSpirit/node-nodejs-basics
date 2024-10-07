import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files_copy');

  try {
    await fs.access(srcDir);

    try {
      await fs.access(destDir);
      throw new Error('FS operation failed');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    await fs.mkdir(destDir);
    const files = await fs.readdir(srcDir);
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      await fs.copyFile(srcFile, destFile);
    }
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await copy();
