import {{prefix}} from '../../app/models/{{prefix}}';

export default (async () => {
    try{
        const data : any = [
            {
                // id: roleId.ROOT,
                // name: "ROOT",
                // level: 100
            },
        ];

        const {{prefix}}s = await {{prefix}}.bulkCreate(data);
        if ({{prefix}}s)
            console.log("{{prefix}}s seeder created with success.");
        console.log("{{prefix}}s seed failure.")
    }catch(e){console.log(e.message)}
})