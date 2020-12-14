import { GraphQLID, GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
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
                // or params.fields
                return new Post(fields).save().then((res) => {
                    return res;
                }).catch(() => {
                    return new Error("A error happen at the creating new post");
                });
            }
        },

        editPostById: {
            type: PostType,
            args: {
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve(parentValue, fields) {
                // const { filter, data } = fields;
                const data = {...fields};
                delete data.id;

                return Post.findOneAndUpdate({ _id: fields.id }, data).exec((err, post) => {
                    if (err) {
                        return new Error("A error happen at the updating post");
                    }

                    return post;
                });
            }
        }

        // Others mutations here ...
    })
});
