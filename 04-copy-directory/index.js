const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const createdPath = path.join(__dirname,'files-copy');
const originPath = path.join(__dirname,'files');

fsPromises.mkdir(createdPath,{recursive: true}).then(
	fsPromises.readdir(originPath).then(
		function(files){
			files.forEach(element => {
				const wayToOriginFile = path.join(originPath, element);
				const wayToCopyFile = path.join(createdPath, element);
				fsPromises.copyFile(wayToOriginFile, wayToCopyFile)
			});
		}
	)
)



