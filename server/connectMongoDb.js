import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://pierredev:Y3wTUbpu3yS6dck@pierrecluster.rae8r.mongodb.net/t20?retryWrites=true&w=majority';

export default () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongoose connection error:'));
    db.once('open', () => console.log(`===> Mongoose Succeeded in connecting`));
};
