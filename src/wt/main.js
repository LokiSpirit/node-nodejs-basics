import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workers = [];

  for (let i = 0; i < numCores; i++) {
    workers.push(
      new Promise((resolve) => {
        const worker = new Worker(path.join(__dirname, 'worker.js'), {
          workerData: 10 + i,
        });
        worker.on('message', (result) => {
          resolve({ status: 'resolved', data: result });
        });
        worker.on('error', () => {
          resolve({ status: 'error', data: null });
        });
      }),
    );
  }

  const workerResults = await Promise.all(workers);
  console.log(workerResults);
};

await performCalculations();
