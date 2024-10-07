import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

import './files/c.js';

const readJSONFile = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error);
    return null;
  }
};

const random = Math.random();

let unknownObject;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileAPath = path.join(__dirname, 'files', 'a.json');
const fileBPath = path.join(__dirname, 'files', 'b.json');

if (random > 0.5) {
  unknownObject = await readJSONFile(fileAPath);
} else {
  unknownObject = await readJSONFile(fileBPath);
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log('Parsed object:', unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
