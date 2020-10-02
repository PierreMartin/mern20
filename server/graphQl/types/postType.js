import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString }
    })
});
