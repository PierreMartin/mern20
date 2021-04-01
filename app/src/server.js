import express from "express";
import path from "path";
import React from "react";
import serialize from "serialize-javascript";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import store, { initializeSession } from './reduxStore';
import App from "./App";

const app = express();

app.use(express.static(path.resolve( __dirname, '../dist')));

app.get( "/*", (req, res) => {
    const context = {};
    store.dispatch(initializeSession());

    const dataRequirements =
        routes
            .filter(route => matchPath(req.url, route) ) // filter matching paths
            .map(route => route.component) // map to components
            .filter(comp => comp.serverFetch) // check if components have data requirement
            .map(comp => store.dispatch(comp.serverFetch())); // dispatch data requirement

    Promise.all(dataRequirements).then(() => {
        // TODO ajouter provider de GraphQl
        const jsx = (
            <ReduxProvider store={store}>
                <StaticRouter context={ context } location={ req.url }>
                    <App />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString(jsx);
        const reduxState = store.getState();
        const helmetData = Helmet.renderStatic();

        res.writeHead(200, { "Content-Type": "text/html" } );
        res.end(htmlTemplate(reactDom, reduxState, helmetData));
    });
});

app.listen(3000);

function htmlTemplate(reactDom, reduxState, helmetData) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString() }
            ${ helmetData.meta.toString() }
            <link rel="stylesheet" type="text/css" href="/app.css" />
        </head>
        
        <body>
            <div id="root">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${ serialize(reduxState, { isJSON: true }) }
            </script>
            <script src="/app.bundle.js"></script>
        </body>
        </html>
    `;
}
