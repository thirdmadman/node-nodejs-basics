/**
 * args.js
 * Parses command line arguments
 * (given in format --propName value --prop2Name value2 with no validation)
 * and prints them to the console in the format propName is value, prop2Name is value2
 */

const parseArgs = () => {
  const args = process.argv.slice(2);
  const combinedArgs = args.join(',').split('--').slice(1);
  console.log(combinedArgs.map((el) => el.split(',').slice(0, 2).join(' is ')).join(', '));
};

parseArgs();
