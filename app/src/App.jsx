import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';

const routes = [
    {
        path: "/",
        title: 'Home',
        exact: true,
        component: Home
    },
    {
        path: "/posts", // /posts/:category
        title: 'The posts',
        component: Login
    },
    {
        path: "/post/create",
        title: 'Add a new post',
        component: Login
    },
    {
        path: "/login",
        title: 'Login',
        component: Login
    }
];

function Routes() {
    // if (connected)  { routes.filter((route) => route.path !== '/login'); }
    return (
        <div>
            <ul>
                {routes.map((route, index) => <li key={index}><Link to={route.path}>{route.title}</Link></li>)}
            </ul>
            <hr />

            <Switch>
                {routes.map((route, index) => <Route key={index} {...route} />)}
            </Switch>
        </div>
    );
}

export default Routes;