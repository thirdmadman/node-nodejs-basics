import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * cp.js
 * Receives array of arguments args and creates child process from file script.js,
 * passing these args to it. This function should create IPC-channel
 * between stdin and stdout of master process and child process:
 * - child process stdin should receive input from master process stdin
 * - child process stdout should send data to master process stdout
 *
 * @param {string[]} argsArray
 */

const spawnChildProcess = async (argsArray = []) => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, 'files/script.js');

  const argsString = argsArray.reduce((acc, cur) => acc.concat(cur.split(' ')), []);

  const childProcess = fork(filePath, argsString, { stdio: 'pipe' });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
