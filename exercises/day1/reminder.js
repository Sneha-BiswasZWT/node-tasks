const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Set reminder for how many seconds?: ', (input) => {
  try {
    const seconds = parseInt(input);

    if (isNaN(seconds) || seconds <= 0) {
      throw new Error('Please enter a valid positive integer.');
    }

    setTimeout(() => {
      console.log('Drink water!');
    }, seconds * 1000);

    rl.close();
  } catch (error) {
    console.log(error.message);
    rl.close();
  }
});
