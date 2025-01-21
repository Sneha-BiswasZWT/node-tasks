const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the number of seconds for the countdown: ', (input) => {
  const seconds = parseInt(input, 10);

 console.log('countdown:');

 let counter=seconds;
 const timer=setInterval(countdown, 1000);

function countdown(){
  if (counter>0){
    console.log(counter +'s');
    counter=counter-1;
  }
  else{
    console.log('times up!');
    clearInterval(timer);
  }
  rl.close();}
});