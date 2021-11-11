type generateFileType = 'models'|'controllers'|'middlewares'|'module';

/**
* @params name String the type name of the class we will generate (model => model)
* generate the file after reading the models
*/

/**
* @params name String the type name of the class we will generate (model => model)
* @params fn Function the callback function
* read a modele then personalize it
*/


import readline from "readline-sync";
import file from "./../../file/file.manager";
import path from "path";

/**
 *
 * Generator
 * the class for generating class (models, controller, middleware)
 *
 *
 **/


export default class FileGenerator {

	/**
	 * @var This is the module/file/routes path were we will keep the result of our class
	 */

	static basePath: string = "./../../../../";
	static modulesPath: string = "./../../../../app/";
	static filePath = path.join(__dirname, "./../models/");
	static routePath = path.join(__dirname, "./../models/routes.ts");

	static fileTypes: Array<string> = ['models', 'controllers', 'middlewares', 'seeders', 'migrations'];

	async bootstrap(componentName: string): Promise<void> {
		if(!componentName) {
			componentName = await readline.question('What do you want to generate ? (controller, model, middleware, seeder, migration) > ');
		}
		if(componentName == null || FileGenerator.fileTypes.indexOf(componentName+'s') === -1) {
			console.error("Give a valid component name !!!")
			this.bootstrap('')
			return;
		}
		await this.generate(componentName)
	}
	/**
	 * generate the files and folders after reading the models	x
	 */
	async generate(fileType: string): Promise<void> {
		try{
			//let moduleName:string = await this.read("module");
			try{
				// await file.readdir(path.join(__dirname, FileGenerator.modulesPath+moduleName))
				let fileContent: string = await file.readFile(this.getFilePath(fileType)+".ts")
				let fileName: string = await this.read(fileType);
				fileName = this.sanitizeFileName(fileName)
				fileContent = fileContent.toString().replace(/{{prefix}}/gi, fileName);

				switch (fileType){
					case "seeder":
						await file.writeFile(path.join(__dirname, FileGenerator.basePath+"database/"+fileType+"s/"+fileName+"Seeder.ts"), fileContent);
						break;
					case "model":
						console.log(FileGenerator.modulesPath)
						await file.writeFile(path.join(__dirname, FileGenerator.modulesPath+fileType+"s/"+fileName+".ts"), fileContent);
						break;
					case "controller":
						await file.writeFile(path.join(__dirname, FileGenerator.modulesPath+"http/controllers/"+fileName+".controller.ts"), fileContent);
						break;
					case "middleware":
						await file.writeFile(path.join(__dirname, FileGenerator.modulesPath+"http/"+fileType+"/"+fileName+".ts"), fileContent);
						break;
					case "migration":
						await file.writeFile(path.join(__dirname, FileGenerator.basePath+"database/"+fileType+"s/"+fileName+"Migration.ts"), fileContent);
						break;
					default:
						throw new Error("this file type not exist")
				}
				console.log("[SUCCESS] Component generated successfully !")

			} catch (e) {
				console.log("[ERROR] Module not found ! ", );
				return;
			}

		} catch (e){
			console.log(e);
		}

	}

	getFilePath(fileType:string) : string {
		return FileGenerator.filePath+fileType;
	}
	/**
	 * @params fileType
	 * read a module name then personalize it
	 */
	read(fileType: string): string {
		return readline.question('Give the '+fileType+' name >');
	}


	private sanitizeFileName(fileName: string) {
		FileGenerator.fileTypes.forEach((element)=>{
			let component: string = element.slice(0, element.length-1);
			if(fileName.toLowerCase().indexOf(component) !== -1){
				fileName = fileName.toLowerCase().replace(component, "");
			}
		})
		return fileName;
	}
}
