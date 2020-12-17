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
                data: {
                    type: dataInput('DataInput_addPost', {
                        title: { type: GraphQLString },
                        description: { type: GraphQLString },
                        content: { type: GraphQLString },
                        isPrivate: { type: GraphQLBoolean },
                        userId: { type: GraphQLString }
                    })
                }
            },
            resolve(parentValue, fields) {
                const { data } = fields;
                return new Post(data).save().then((res) => {
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
                    type: filterInput('FilterInput_editPost', {
                        _id: { type: GraphQLID }
                    })
                },
                data: {
                    type: dataInput('DataInput_editPost', {
                        title: { type: GraphQLString },
                        description: { type: GraphQLString },
                        content: { type: GraphQLString }
                    })
                }
            },
            resolve(parentValue, fields) {
                const { filter, data } = fields;

                return Post.findOneAndUpdate(filter, data).then((res) => {
                    return res;
                }).catch(() => {
                    return new Error("A error happen at the updating post");
                });
            }
        }

        // Others mutations here ...
    })
});
