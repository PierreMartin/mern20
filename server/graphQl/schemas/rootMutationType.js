import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
import { PostType } from '../types/postType';
import { Post } from "../../models/post";

export const RootMutationType = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        addPost: {
            type: PostType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                content: { type: GraphQLString },
                isPrivate: { type: GraphQLBoolean },
                userId: { type: GraphQLString }
            },
            resolve(parentValue, fields) {
                return new Post(fields).save().then((res) => {
                    return res;
                }).catch(() => {
                    return new Error("A error happen at the creating new post");
                });
            }
        },

        // Others mutations here ...
    })
});
