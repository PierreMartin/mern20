import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { PostType } from '../types/postType';
import { Post } from "../../models/post";
import { dataInput, filterInput } from "../types/inputObjectType";

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
                /*
                id: { type: GraphQLID },
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                content: { type: GraphQLString }
                */
                filter: {
                    type: filterInput({
                        _id: { type: GraphQLID }
                    })
                },
                data: {
                    type: dataInput({
                        title: { type: GraphQLString },
                        description: { type: GraphQLString },
                        content: { type: GraphQLString }
                    })
                }
            },
            resolve(parentValue, fields) {
                const { filter, data } = fields;

                return Post.findOneAndUpdate(filter, data).exec((err, post) => {
                    if (err) {
                        return new Error("A error happen at the updating post");
                    }

                    return post; // TODO mettre partout { message: 'You have updated the post', data: post };
                });
            }
        }

        // Others mutations here ...
    })
});
