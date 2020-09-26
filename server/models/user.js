import mongoose from 'mongoose';

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

export const User = mongoose.model('User', UserSchema);
