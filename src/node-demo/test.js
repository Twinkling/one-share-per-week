// import env from './env';

// console.log(env.appid)

const message = 'fix(leedarson|qiping)';
const regex = /\(([a-zA-Z0-9\-_|]+)\)/;
regex.test(message);
const match = message.match(regex);
const scopeFilterKeys = match[1].split('|');

console.log(scopeFilterKeys);