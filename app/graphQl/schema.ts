import 'graphql-import-node';
import {makeExecutableSchema} from 'graphql-tools';

import allSchema from './schemas';
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
    typeDefs : allSchema,
    resolvers
})

export default schema;