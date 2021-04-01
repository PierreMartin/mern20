import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from "react-router-dom";
import store from './reduxStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
    uri: 'http://localhost:3080/graphql/',
    cache: new InMemoryCache()
});

const jsx = (
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Router>
                    <App />
                </Router>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>
);

const app = document.getElementById('root');
ReactDOM.hydrate(jsx, app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
