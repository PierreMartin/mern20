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
                }).catch((err) => {
                    return { message: "A error happen at the creating new post" , err };
                });
            }
        },

        // Others mutations here ...
    })
});
