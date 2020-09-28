import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reduxReducers/index";

// export default createStore(rootReducer, applyMiddleware(logger));

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');

    middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);
export default store;
