import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const stream = createWriteStream(filePath, 'utf-8');

  process.stdin.pipe(stream);

  stream.on('error', (error) => {
    console.error('Error writing to file:', error);
  });
};

await write();
