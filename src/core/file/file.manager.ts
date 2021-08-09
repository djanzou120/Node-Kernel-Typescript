import fs from "fs";
import util from "util";
const promisify : Function = util.promisify;

export default class FileManager {

    static readFile: Function = promisify(fs.readFile)
    static writeFile: Function = promisify(fs.writeFile)
    static readdir: Function = promisify(fs.readdir);
    static mkdirSync: Function = fs.mkdirSync;
    /**
     *
     * @param folderName
     */
    static createFolder(folderName: string): void{
        fs.mkdir(folderName, (error: NodeJS.ErrnoException | null): void => {
            if (error){
                console.log(error);
                return;
            }
        });
    }
}