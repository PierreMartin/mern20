import express from 'express';
import initExpress from './initExpress';
import initGrapgQl from './graphQl/index';
import mongoose from 'mongoose';
import initRoutes from './routes';
import initPassport from './authent/index';
import connectMongoDb from './connectMongoDb';

const port = 3080;
const app = express();

connectMongoDb(mongoose);
initPassport();
initExpress(app, mongoose);
initGrapgQl(app);
initRoutes(app);

app.listen(port, () => {
    console.log('--------------------------');
    console.log('===> Starting Server . . .');
    console.log(`===> Environment: ${process.env.NODE_ENV}`);
    console.log(`===> Listening at http://localhost:${port}`);
    console.log('--------------------------');
});
