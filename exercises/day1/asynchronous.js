const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('/// Success:1, failure:0 /// enter input: ', (input) => {

let userinput = parseInt(input);
let value = true;

value = (userinput === 1) ? true : (userinput === 0) ? false : null;

if (value === null) {
  console.log("Invalid input");
  rl.close();
  return;
}

function fetchData(){
    const promisetoken=new Promise((resolve,reject)=>{
        setTimeout(() => 
            {if(value){
            resolve();
                    }
        else{
            reject();
        }

    },2000)});
    return promisetoken;
}

const promisetoken=fetchData();
promisetoken.then(()=>{
    console.log( "Data fetched successfully!");

}).catch(()=>{
    console.log( "Error: Failed to fetch data.");});
    rl.close();}

)

