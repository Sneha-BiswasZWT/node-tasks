const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('set reminder for how many seconds?: ', (input) => {
  const seconds = input;
  
setTimeout(() =>
    console.log('Drink water')
, seconds*1000);
rl.close();
});