import readline from "readline-sync";
import file from "./../../file/file.manager";
import path from "path";
/**
*
* Generator 
* the class for generating modules 
*
* @author LTPhen
*
**/

export default class ModuleGenerator {

	/**
	 * @var This is the module/file/routes path were we will keep the result of our class
	 */

	static modulesPath: string = "./../../../../";
	static filePath = path.join(__dirname, "./../models/module.ts");
	static routePath = path.join(__dirname, "./../models/routes.ts");

	static moduleComponents: Array<string> = ['models', 'controllers', 'middlewares', 'routing'];

	/**
	 * generate the files and folders after reading the models
	 */
	async generate(moduleName: string): Promise<void> {
		try{
			if(!moduleName)
				moduleName = await this.read();
			let contentIndex: string = await file.readFile(ModuleGenerator.filePath)
			let contentRoute: string = await file.readFile(ModuleGenerator.routePath)
			contentIndex = contentIndex.toString().replace(/{{prefix}}/gi, moduleName);
			contentRoute = contentRoute.toString().replace(/{{prefix}}/gi, moduleName);

			await file.createFolder(path.join(__dirname, ModuleGenerator.modulesPath+moduleName));
			await Promise.all(ModuleGenerator.moduleComponents.map(async (component: string) =>{
				await file.createFolder(path.join(__dirname, ModuleGenerator.modulesPath+moduleName+"/"+component));
			}))
			const indexFile: string = ModuleGenerator.modulesPath+moduleName+"/module.ts";
			const routeFile: string = ModuleGenerator.modulesPath+moduleName+"/routing/routes.ts";

			await Promise.all([
				{filename: indexFile, content: contentIndex},
				{filename: routeFile, content: contentRoute}
				].map(async (newFile: {filename: string, content: string}) =>{
				try{
					await file.writeFile(path.join(__dirname, newFile.filename), newFile.content);
				} catch (e) {
					console.log(e);
				}
			}))

			console.log("[SUCCESS] Module generated successfully !")

		} catch (e){
			console.log("[Error] Something wrong happened !")

			console.log(e);
		}

	}

	/**
	 * @params fn Function the callback function
	 * read a module name then personalize it
	 */
	read(): string {
		return readline.question('Give the module name > ');
	}



}
