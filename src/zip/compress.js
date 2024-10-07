import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const inputPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const outputPath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(inputPath);
  const writeStream = createWriteStream(outputPath);
  const gzip = createGzip();

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('error', (error) => {
      console.error('Error during compression:', error);
    });
};

await compress();
