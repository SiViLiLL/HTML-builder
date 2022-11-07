const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const createdPath = path.join(__dirname,'project-dist');
const wayToStylesPath = path.join(__dirname, 'styles');
const wayToCreatedFile = path.join(createdPath, 'style.css');
const createdPathAssets = path.join(createdPath,'assets');
const originPathAssets = path.join(__dirname,'assets');
const wayToIndexHtml = path.join(createdPath, 'index.html');
const wayToTemplateHtml = path.join(__dirname, 'template.html');
const wayToComponents = path.join(__dirname, 'components');

fsPromises.mkdir(createdPath,{recursive: true}).then(
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
).then(
	fsPromises.mkdir(createdPathAssets,{recursive: true}).then(
		fsPromises.readdir(originPathAssets,{withFileTypes: true}).then(
			function(files){
				files.forEach(element => {
					if (element.isDirectory()){
						const wayToElement = path.join(originPathAssets, element.name);
						const wayToCreatedElement = path.join(createdPathAssets, element.name);
						fsPromises.mkdir(wayToCreatedElement,{recursive: true}).then(
							fsPromises.readdir(wayToElement,{withFileTypes: true}).then(
							   function(files){
							   	files.forEach(element => {
							   		const wayToElementOriginFile = path.join(wayToElement, element.name);
							   		const wayTiElementCopyFile = path.join(wayToCreatedElement,element.name)
				                  fsPromises.copyFile(wayToElementOriginFile, wayTiElementCopyFile)
							   	})
							   }
						   )
						)
					}
				})
			}
		)
	)
).then(
	fsPromises.open(wayToIndexHtml, 'w').then(
		fsPromises.readFile(wayToTemplateHtml).then(
			function(content){
				fsPromises.appendFile(wayToIndexHtml, content).then(
					fsPromises.readFile(wayToIndexHtml,'utf8','w').then(
						function(data){
							fsPromises.readdir(wayToComponents,{withFileTypes: true}).then(
								function(files){
									files.forEach(element =>{
										if (element.isFile()){
											const wayToFile = path.join(__dirname, 'components', element.name);
											const fileExt = path.extname(element.name);
											const fileName = path.basename(wayToFile, fileExt);
											fsPromises.readFile(wayToFile,'utf8','w').then(
												function(dataFile){
													data = data.replace(`{{${fileName}}}`, dataFile);
													fsPromises.writeFile(wayToIndexHtml,data,{encoding:'utf8',flag:'w'})
												}
											)
										}
									})
								}
							)
						}
					)
				)
			}
		)
	)
)

