import React from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";
import Home from './pages/Home';
import PostAdd from './pages/PostAdd';
import Login from './pages/Login';
import PostsList from "./pages/PostsList";

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
        component: PostsList,
        requireAuth: true
    },
    {
        path: "/post/create",
        title: 'Add a new post',
        component: PostAdd,
        requireAuth: true
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
                {routes.map((route, index) => {
                    if (route.requireAuth) {
                        const Component = route.component;
                        return (
                            <PrivateRoute {...route} key={index}>
                                <Component />
                            </PrivateRoute>
                        );
                    }

                    return <Route key={index} {...route} />;
                })}
            </Switch>
        </div>
    );
}

export default Routes;

function PrivateRoute({ children, ...rest }) {
    const isAuthenticated = true; // TODO localStorage ??

    return (
        <Route
            path={rest.path}
            render={({ location }) => isAuthenticated ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }}/>) }
        />
    );
}
