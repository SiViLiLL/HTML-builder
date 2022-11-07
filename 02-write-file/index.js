const readline = require('readline');
const path = require('path');
const fs = require('fs');
const process = require('process');

const file = path.join(__dirname, 'text.txt');
const consoleLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

consoleLine.question('Would you like to enter any data?\n', answer => {
	if (answer === "exit" ) {
		consoleLine.close()
	} else {
	   answer = answer + '\n';
	   fs.appendFile( file, answer, (err) => {})
	   consoleLine.setPrompt('Do you want to enter more data?\n')
	   consoleLine.prompt()
	   consoleLine.on('line', (answer) => {
		if (answer === "exit") {
				consoleLine.close()
		} else {
			answer = answer + '\n';
	      fs.appendFile( file, answer, (err) => {})
			consoleLine.setPrompt('Do you want to enter more data?\n')
	      consoleLine.prompt()
	   }
	   })
   }
})

consoleLine.on('close', () => {
	console.log('Bye')
});

if (process.platform === "win32"){
	consoleLine.on("SIGINT", function () {
		process.emit("SIGINT");
	 });
}

process.on("SIGINT", function () {
	console.log('Bye');
	process.exit();
 });

