import { parentPort, workerData } from 'worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

/**
 * worker.js
 * Work with data received from main thread, sends result of the computation to the main thread
 *
 * @param {number} n
 *
 */

const sendResult = () => {
  parentPort.postMessage(nthFibonacci(workerData));
};

sendResult();
