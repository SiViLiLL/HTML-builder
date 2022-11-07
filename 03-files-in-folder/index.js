const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname,'secret-folder');

fs.readdir(secretFolder, {withFileTypes: true}, (err, files) => {
	files.forEach( file => {
		if(file.isFile()){
			const wayToFile = path.join(__dirname, 'secret-folder', file.name);
			const fileExt = path.extname(file.name);
			const fileInfo = path.basename(wayToFile, fileExt);
			const fileStat = fs.stat(wayToFile, (err, stats) => console.log(fileInfo + ' - ' + fileExt + ' - ' + stats.size + 'b'));
		}
	})
})

