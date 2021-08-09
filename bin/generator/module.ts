import ModuleGenerator from "./../../src/core/cli/generator/module.generator";

(async ()=>{
    const module = new ModuleGenerator();
    await module.generate(process.argv[2]);
})()