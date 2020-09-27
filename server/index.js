import express from 'express';
import initExpress from './initExpress';
import mongoose from 'mongoose';
import initRoutes from './routes';
import initPassport from './authent/index';
import connectMongoDb from './connectMongoDb';

const port = 3080;
const app = express();

connectMongoDb(mongoose);
initPassport();
initExpress(app, mongoose);
initRoutes(app);

// AuthPassport - req.isAuthenticated() returns true on every request even after refreshing the page:
/*
app.use('/', (req, res, next) => {
    const authenticated = req.isAuthenticated();
    console.log('authenticated ==> ', authenticated);
    console.log(req.user);

    if (authenticated) {
        // returns true if a user already logged in.
    }
    next();
});
*/

app.listen(port, () => {
    console.log('--------------------------');
    console.log('===> Starting Server . . .');
    console.log(`===> Environment: ${process.env.NODE_ENV}`);
    console.log(`===> Listening at http://localhost:${port}`);
    console.log('--------------------------');
});
