import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    email: { type: String, lowercase: true, unique: true },
    // username: { type: String, unique: true }, // I use only 'email'
    password: String,
    firstname: { type: String, default: '' },
    lastname: { type: String, default: '' },
    tokens: Array,
    provider: { type: String, default: 'local' },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
});

// AuthPassport:
function encryptPassword(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }

    return bcrypt.genSalt(5, (saltErr, salt) => {
        if (saltErr) { return next(saltErr); }

        return bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) { return next(hashErr); }

            user.password = hash; // Store hash in DB
            return next();
        });
    });
}

UserSchema.pre('save', encryptPassword);

export const User = mongoose.model('User', UserSchema);
