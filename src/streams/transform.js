import { Transform } from 'stream';

/**
 * transform.js
 * Reads data from process.stdin, reverses text using Transform Stream and
 * then writes it into process.stdout
 */

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      callback(null, reversedChunk);
    },
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
