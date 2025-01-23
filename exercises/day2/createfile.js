const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.question('Enter file name: ', (input) => {
    const name = input;
    if (!name) {
        console.error('File name cannot be empty.');
        rl.close();
        return;
    }

    rl.question('Enter content: ', (input2) => {
        const content = input2;
        if (!content) {
            console.error('Content cannot be empty.');
            rl.close();
            return;
        }
        //if file exists
        if (fs.existsSync(`${name}.txt`)) {
            rl.question("file already exists, do you want to 1. overwrite, 2. append, 3. exit\nEnter your choice (1,2,3):", (choice) => {
                if (choice == 1) {
                    fs.writeFile(`${name}.txt`, content, (err) => {
                        if (err) {
                            console.error('Error writing the file:', err);
                        } else {
                            console.log(`File "${name}.txt" created:`);
                            console.log(content);
                        } rl.close();
                        return;
                    })

                }
                else if (choice == 2) {
                    fs.appendFile(`${name}.txt`, `\n${content}`, (appendErr) => {
                        if (appendErr) {
                            console.error('Error appending to the file:', appendErr);
                        } else {
                            console.log('Text appended successfully!');
                            console.log(content);
                        }
                        rl.close();
                    })
                }
                else if (choice == 3) {
                    console.log("exiting");
                    rl.close();
                }
                else {
                    console.error('enter valid choice');
                    rl.close();
                    return;
                }
            });

        } else if (!fs.existsSync(`${name}.txt`)) {
            fs.writeFile(`${name}.txt`, content, (err) => {
                if (err) {
                    console.error('Error writing the file:', err);
                } else {
                    console.log(`File "${name}.txt" created:`);
                    console.log(content);
                    rl.close();

                }
            })
        }
    });
});