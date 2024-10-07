import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const dirPath = path.join(__dirname, 'files');

  try {
    await fs.access(dirPath);

    const files = await fs.readdir(dirPath);
    console.log(files);
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await list();
