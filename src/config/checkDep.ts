import depcheck from "depcheck";
import path from "path";
import readline from "readline-sync";
import {exec} from "child_process";

const checkDependency = async function (){
    const dep = await depcheck(path.join(path.resolve(__dirname), '../../'), {})

    if (dep.dependencies){
        const response = readline.question('The unusual package founded. Do you to remove it? (yes, no)> ');

        switch (response){
            case 'yes':
                for (const dependency of dep.dependencies){
                    await exec('npm uninstall ' + dependency, function (err, stdout, stderr){
                        if (err)
                            console.log('ERROR : ' + err);
                        if (stderr)
                            console.log('STDERR : ' + stderr)
                        else
                            console.log('STDOUT : ' + stdout)
                    });
                }
                console.log('Packages uninstalled with success.')
                break;
            case 'no':
                console.log('Okay...')
                break;
            default :
                console.error('invalid choice.')
                await checkDependency();
                break;
        }
    }
}

export default checkDependency;