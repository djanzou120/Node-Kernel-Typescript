import helloResolver from "./resolvers/hello.resolver";

const resolvers = {
    Query : {
        ...(helloResolver.Query && {...helloResolver.Query})
    }
    // Mutation : {
    //
    // }
}

export default resolvers;