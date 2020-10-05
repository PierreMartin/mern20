import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { checkAuthenticationAction, logoutAction } from "./reduxActions/user";
import Home from './pages/Home';
import PostAdd from './pages/PostAdd';
import Login from './pages/Login';
import PostsList from "./pages/PostsList";
import UsersList from "./pages/UsersList";
import User from "./pages/User";
import './app.less';

function App({ checkAuthenticationAction, authenticated, me, logoutAction }) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    let routes = [
        {
            path: "/",
            title: 'Home',
            exact: true,
            component: Home
        },
        {
            path: "/posts",
            title: 'The posts',
            component: PostsList,
            requireAuth: true
        },
        {
            path: "/users",
            title: 'The users',
            component: UsersList,
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
        },

        // Output of main menu:
        {
            path: "/user/:id",
            title: 'User',
            component: User,
            hideMainMenu: true
        }
    ];

    useEffect(() => {
        checkAuthenticationAction().then(() => {
            setIsLoading(false);
        });
    }, []);

    if (authenticated)  { routes = routes.filter((route) => route.path !== '/login'); }

    return (
        <div>
            <nav className="main-nav">
                <div className="left">
                    <ul>
                        {routes.map((route, index) => {
                            if (route.hideMainMenu) { return; }

                            return <li key={index}><Link to={route.path}>{route.title}</Link></li>;
                        })}
                    </ul>
                </div>

                <div className="right">
                    {
                        authenticated && (
                            <div>
                                Welcome {me && me.firstname}
                                <button
                                    onClick={() => {
                                        logoutAction().then((res) => {
                                            if (res && res.payload && !res.payload.authenticated) { history.push("/"); }
                                        });
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
            </nav>
            <hr />

            <Switch>
                {routes.map((route, index) => {
                    if (route.requireAuth) {
                        const Component = route.component;
                        return (
                            <PrivateRoute {...route} key={index} authenticated={authenticated} isLoading={isLoading}>
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

App.propTypes = {
    authenticated: PropTypes.bool,
    me: PropTypes.any,
    checkAuthenticationAction: PropTypes.func,
    logoutAction: PropTypes.func
};

function mapStateToProps(state) {
    return {
        authenticated: state.user.authenticated,
        me: state.user.me
    };
}

export default connect(mapStateToProps, { checkAuthenticationAction, logoutAction })(App);

function PrivateRoute({ children, authenticated, isLoading, ...rest }) {
    return (
        <Route
            path={rest.path}
            render={({ location }) => authenticated ? (children) : (!isLoading && <Redirect to={{ pathname: "/login", state: { from: location } }}/>) }
        />
    );
}

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool,
    path: PropTypes.string,
    isLoading: PropTypes.bool
};
