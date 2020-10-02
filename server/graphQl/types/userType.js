import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from "graphql";
import { PostType } from "./postType";
import { Post } from "../../models/post";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },

        // entité liée :
        posts: {
            type: new GraphQLList(PostType),
            resolve(parentValue) {
                return Post.find({ userId: parentValue.id }); // TODO add 'userId' to request when create new post
            }
        }
    })
});
