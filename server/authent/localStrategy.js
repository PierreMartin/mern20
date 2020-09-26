import passportLocal from 'passport-local';
import { User } from "../models/user";

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email }, (err, user) => {
                if (err) { return done(err); }
                if (!user) {return done(null, false, { message: 'Incorrect email.' });}
                if (!user.validPassword(password)) {return done(null, false, { message: 'Incorrect password.' });}
                return done(null, user);
            });
        }
    ));
};
