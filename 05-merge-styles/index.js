const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const wayToStylesPath = path.join(__dirname, 'styles');
const wayToCreatedFile = path.join(__dirname,'project-dist', 'bundle.css');

fsPromises.open(wayToCreatedFile,'w').then(
   fsPromises.readdir(wayToStylesPath, {withFileTypes: true}).then(
   	function(files){
   		files.forEach(element => {
   			const fileExt = path.extname(element.name);
   			if(element.isFile() && fileExt === '.css'){
					const wayToElement = path.join(__dirname, 'styles', element.name);
					fsPromises.readFile(wayToElement).then(
						function(content){
							fsPromises.appendFile(wayToCreatedFile, content + '\n')
						}
					)
   			}
   		});
   	}
   )
)