import passport from 'passport';
import { User } from '../models/user';

/**
 * POST /api/login
 */
export function login(req, res, next) {
    // AuthPassport: 'local' define in authent/localStrategy.js
    passport.authenticate('local', (authErr, user, info) => {
        if (authErr) { return next(authErr); }

        // unauthorized error (if wrong password or wrong login):
        if (!user) {
            // return res.redirect('/login');
            return res.status(401).json({
                message: info.message,
                fieldsErrors: [{ name: 'email', errors: [info.message] }]
            });
        }

        // Establish a session:
        return req.logIn(user, (loginErr) => {
            if (loginErr) { return next(loginErr); }

            // return res.redirect('/');
            return res.status(200).json({
                message: 'You\'re now logged.',
                data: {
                    authenticated: true,
                    me: user
                }
            });
        });
    })(req, res, next);
}

/**
 * POST /api/signup
 */
export function signUp(req, res, next) {
    const data = req.body;
    const user = new User(data);

    User.findOne({ email: data.email }, (findErr, existingUser) => {
        // conflict errors :
        if (existingUser) {
            return res.status(409).json({
                message: 'Account already exist!',
                fieldsErrors: [{ name: 'email', errors: ['Account already exist!'] }]
            });
        }

        // create account :
        return user.save((saveErr) => {
            if (saveErr) { return next(saveErr); }

            // Establish a session :
            return req.logIn(user, (loginErr) => {
                if (loginErr) { return next(loginErr); }

                return res.status(200).json({
                    message: 'You\'re now logged.',
                    data: {
                        authenticated: true,
                        me: user
                    }
                });
            });
        });
    });
}

/**
 * POST /api/checkauthentication
 */
export function checkAuthentication(req, res) {
    const authenticated = req.isAuthenticated();

    return res.status(200).json({
        data: {
            authenticated,
            me: req.user
        }
    });
}

/**
 * POST /api/logout
 */
export function logout(req, res) {
    req.logout();

    return res.status(200).json({
        message: 'You\'re now logout.',
        data: {
            authenticated: false,
            me: null
        }
    });
}
