import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './rootQueryType';
// import RootMutationType from './mutations';

export const schema = new GraphQLSchema({
    query: RootQueryType,
    // mutation: RootMutationType
});
