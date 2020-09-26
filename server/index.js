import express from 'express';
import initExpress  from './initExpress';
import initRoutes  from './routes';
import connectMongoDb from './connectMongoDb';

const port = 3080;
const app = express();

connectMongoDb();

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

app.listen(port, () => {
    console.log('--------------------------');
    console.log('===> Starting Server . . .');
    console.log(`===> Environment: ${process.env.NODE_ENV}`);
    console.log(`===> Listening at http://localhost:${port}`);
    console.log('--------------------------');
});
