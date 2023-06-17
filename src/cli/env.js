/**
 * env.js
 * Parses environment variables with prefix RSS_ and prints them to the console
 * in the format RSS_name1=value1; RSS_name2=value2
 * @param {string} parsePrefix
 */

const parseEnv = (parsePrefix = 'RSS_') => {
  const keys = Object.keys(process.env).filter((name) => name.indexOf(parsePrefix) === 0);
  const strings = keys.map((key) => `${key}=${process.env[key]};`);
  console.log(strings.join(' '));
};

parseEnv();
