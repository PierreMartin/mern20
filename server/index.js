import express from 'express';
import initExpress  from './initExpress.js';
import initRoutes  from './routes';

const port = 3080;
const app = express();

// connect to MongoDB using mongoose - register mongoose Schema
// const MONGO_URI = 'mongodb://localhost/t20';
// connect(); => mongoose.connect(MONGO_URI);
// mongoose.connection
//     .once('open', () => console.log('Connecté à MongoLab'))
//     .on('error', error => console.log('Erreur de connexion à MongoLab:', error));

// passport configuration
// initPassport();

/*
if (isDebug) {
    // enable webpack hot module replacement
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack/webpack.config');
    const devBrowserConfig = webpackConfig({ browser: true });
    const compiler = webpack(devBrowserConfig);
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}
*/

initExpress(app);
initRoutes(app);

/*app.get('*', (req, res) => {
    res.status(200).send(require('../dist/index.html'));
});*/

app.listen(port, () => {
    console.log('--------------------------');
    console.log('===> Starting Server . . .');
    console.log(`===> Environment: ${process.env.NODE_ENV}`);
    console.log(`===> Listening at http://localhost:${port}`);
    console.log('--------------------------');
});
