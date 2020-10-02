import { graphqlHTTP } from 'express-graphql';
import { schema } from './schemas/index';

export default (app) => {
    // The root provides a resolver function for each API endpoint
    const root = {
        hello: () => {
            return 'Hello world!';
        }
    };

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }));

    /*
    app.post('/graphql', graphqlHTTP({
        schema,
        graphiql: false,
    }));

    app.get('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
    }));
    */
};
