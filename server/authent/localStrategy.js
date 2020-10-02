import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from "../models/user";

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email }, (err, user) => {
                if (err) { return done(err); }

                if (!user) {
                    return done(null, false, { message: 'Incorrect email' });
                }

                const hashPassword = user.password;
                const candidatePassword = password;

                return bcrypt.compare(candidatePassword, hashPassword, (err, isMatch) => {
                    if (err) {
                        return done(null, false, { message: 'Incorrect password' });
                    }

                    if (isMatch) {
                        return done(null, user);
                    }

                    return done(null, false, { message: 'Incorrect password' });
                });
            });
        }
    ));
};
