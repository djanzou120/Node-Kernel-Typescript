import 'graphql-import-node';
import * as typeDefs from './schema.graphql';
import {makeExecutableSchema} from 'graphql-tools'
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export default schema;