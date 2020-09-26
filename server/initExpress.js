import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
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

    const MongoStore = connectMongo(session); // TODO finir ca !!
    const sess = {
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
        proxy: true, // The "X-Forwarded-Proto" header will be used.
        name: 'sessionId',
        // Add HTTPOnly, Secure attributes on Session Cookie
        // If secure is set, and you access your site over HTTP, the cookie will not be set
        cookie: {
            httpOnly: true,
            secure: false
        },
        store: new MongoStore(
            {
                url: 'mongodb+srv://pierredev:Y3wTUbpu3yS6dck@pierrecluster.rae8r.mongodb.net/t20?retryWrites=true&w=majority',
                autoReconnect: true
            }
        )
    };

    app.use(session(sess)); // AuthPassport: A session will be established and maintained via a cookie set in the user's browser
    app.use(passport.initialize());
    app.use(passport.session());
};
