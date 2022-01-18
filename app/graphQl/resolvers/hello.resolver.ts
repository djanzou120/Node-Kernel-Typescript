const helloResolver = {
    Query : {
        hello (_: void, args: void) : string {
            return `👋 Hello world! 👋`;
        },
    }
}

export default helloResolver;