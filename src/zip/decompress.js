import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputPath = path.join(__dirname, 'files', 'archive.gz');
  const outputPath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(outputPath);
  const gunzip = createGunzip();

  readStream
    .pipe(gunzip)
    .pipe(writeStream)
    .on('error', (error) => {
      console.error('Error during decompression:', error);
    });
};

await decompress();
