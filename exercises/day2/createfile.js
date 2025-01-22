const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('Enter file name: ', (input) => {
    const name=input;
    if (!name) {
        console.error('File name cannot be empty.');
        rl.close();
        return;
    }

    rl.question('Enter content: ', (input2) => {
        const content=input2;
        if (!content) {
            console.error('Content cannot be empty.');
            rl.close();
            return;
        }

        fs.writeFile(`${name}.txt`, content, (err) => {
            if (err) {
                console.error('Error', err);
            } else {
                console.log(`File "${name}.txt" created:`);
                console.log(content);
            }

            fs.appendFileSync(`${name}.txt`, ' this is appended')
            rl.close();
        });
    });
});