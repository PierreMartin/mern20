import { GraphQLInputObjectType } from "graphql";

export const filterInput = (filters) => {
    return new GraphQLInputObjectType({
        name: 'FilterInput',
        fields: () => (filters)
    });
}

export const dataInput = (data) => {
    return new GraphQLInputObjectType({
        name: 'DataInput',
        fields: () => (data)
    });
}
