import { GraphQLInputObjectType } from "graphql";

export const filterInput = (name, filters) => {
    return new GraphQLInputObjectType({
        name,
        fields: () => (filters)
    });
}

export const dataInput = (name, data) => {
    return new GraphQLInputObjectType({
        name,
        fields: () => (data)
    });
}
