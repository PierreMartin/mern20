import { graphqlHTTP } from 'express-graphql';
import { schema } from './schemas/index';

export default (app) => {
    // The root provides a resolver function for each API endpoint
    const root = {
        hello: () => 'Hello world!'
    };

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }));
};
