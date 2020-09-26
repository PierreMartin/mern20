import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import path from 'path';

export default (app) => {
    // Enable Cors:
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(bodyParser.json());
    app.use(express.static(path.join(process.cwd(), 'public')));

    // auth test:
    /*app.get('*', (req) => {
        const authenticated = req.isAuthenticated();

        console.log('authenticated ==> ', authenticated);
        console.log(req.user);
    });*/

    app.use(session({ secret: "cats" })); // AuthPassport: A session will be established and maintained via a cookie set in the user's browser
    app.use(passport.initialize());
    app.use(passport.session());
};
