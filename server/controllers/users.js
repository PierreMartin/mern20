import { User } from '../models/user';

/**
 * POST /api/login
 */
export function login(req, res, next) {
    // AuthPassport: 'local' define in passport/local.js
    /*passport.authenticate('local', (authErr, user, info) => {
        if (authErr) { return next(authErr); }

        // unauthorized error (if wrong password or wrong login) :
        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        // Establish a session:
        return req.logIn(user, (loginErr) => {
            if (loginErr) { return res.status(401).json({ message: loginErr }); }

            return res.status(200).json({ message: 'You\'re now logged.', data: user });
        });
    })(req, res, next);*/
}

/**
 * POST /api/signup
 */
export function signUp(req, res, next) {
    const data = req.body;
    // const user = new User(data);

    User.findOne({ email: data.email }, (findErr, existingUser) => {
        // conflict errors :
        if (existingUser) {
            return res.status(409).json({ message: 'Count already exist!' });
        }

        // create count :
        /*return user.save((saveErr) => {
            if (saveErr) return next(saveErr);

            // Establish a session :
            return req.logIn(user, (loginErr) => {
                if (loginErr) return res.status(401).json({message: loginErr});

                return res.status(200).json({message: 'You\'re now logged.', data: user});
            });
        });*/
    });
}

/**
 * POST /api/logout
 */
export function logout(req, res) {
    req.logout();
    res.redirect('/');
}
