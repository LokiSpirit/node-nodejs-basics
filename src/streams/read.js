import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { pipeline } from 'stream/promises';

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath, 'utf-8');

  try {
    await pipeline(stream, process.stdout, { end: false });
    console.log('\n');
  } catch (error) {
    console.error('Error reading file:', error);
  }
};

await read();
