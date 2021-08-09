import FileGenerator from "./../../src/core/cli/generator/file.generator";
(async ()=>{
    const module = new FileGenerator();
    await module.bootstrap(process.argv[2]);
})();