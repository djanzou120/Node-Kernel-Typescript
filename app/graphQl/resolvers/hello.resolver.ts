const helloResolver = {
    Query : {
        hello (_ : void, args : {id : number}) : string {
            return `👋 Hello world! 👋 : ${args.id}`;
        }
    }
}

export default helloResolver;