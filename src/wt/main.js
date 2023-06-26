import path from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';
import os from 'os';

/**
 * main.js
 * @brief Creates number of worker threads from file, send data to those threads and
 * receive result of the computation.
 *
 * @details Creates number of worker threads (equal to the number of host machine logical CPU cores)
 * from file worker.js and able to send data to those threads and
 * to receive result of the computation from them.
 *
 * Send incremental number starting from 10 to each worker.
 * For example:
 * On host machine with 4 cores you should create 4 workers and send 10 to first worker,
 * 11 to second worker, 12 to third worker, 13 to fourth worker.
 * After all workers will finish, function should log array of results into console.
 *
 * @return The results are array of objects with 2 properties:
 * - status:
 *    + 'resolved' in case of successfully received value from worker
 *    + 'error' in case of error in worker
 * - data:
 *    + value from worker in case of success
 *    + null in case of error in worker
 *
 * @note The results in the array will be in the same order that the workers were created.
 *
 * @return {Array<{status: 'resolved' | 'error', data: number | null}>} resultArray
 */

const CPU_CORES = os.cpus().length;

const performCalculations = async (relativeFilePath = './worker.js') => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, relativeFilePath);

  const resultArray = [];

  let data = 10;

  const handleDataFromWorker = (workerResult, workerId) => {
    resultArray[workerId] = workerResult;

    if (resultArray.filter((el) => el).length === CPU_CORES) {
      console.log(resultArray);
    }
  };

  const createWorker = (workerData, workerId) => {
    const worker = new Worker(filePath, { workerData });
    // console.log(workerData);
    // worker.postMessage(workerData);

    worker.on('message', (message) => {
      const result = {
        status: 'resolved',
        data: message,
      };

      handleDataFromWorker(result, workerId);
    });

    worker.on('error', (e) => {
      console.log(e);
      const result = {
        status: 'error',
        data: null,
      };
      handleDataFromWorker(result, workerId);
    });
  };

  for (let i = 0; i < CPU_CORES; i += 1) {
    data += 1;
    createWorker(data, i);
  }
};

await performCalculations();
