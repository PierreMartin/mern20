import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { checkAuthenticationAction, logoutAction } from "./reduxActions/user";
import Home from './pages/Home';
import PostAdd from './pages/PostAdd';
import Login from './pages/Login';
import PostsList from "./pages/PostsList";
import './app.css';

let routes = [
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

function App(props) {
    const history = useHistory();

    useEffect(() => {
        props.checkAuthenticationAction();
    }, []);

    // TODO pas bon
    if (props.authenticated)  { routes = routes.filter((route) => route.path !== '/login'); }

    return (
        <div>
            <nav className="main-nav">
                <div className="left">
                    <ul>
                        {routes.map((route, index) => <li key={index}><Link to={route.path}>{route.title}</Link></li>)}
                    </ul>
                </div>

                <div className="right">
                    {
                        props.authenticated && (
                            <div>
                                Welcome {props.me && props.me.firstname}
                                <button onClick={() => {
                                    props.logoutAction().then((res) => {
                                        if (res && res.payload && !res.payload.authenticated) { history.push("/"); }
                                    });
                                }}>Logout</button>
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
                            <PrivateRoute {...route} key={index} authenticated={props.authenticated}>
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
    checkAuthenticationAction: PropTypes.func
};

function mapStateToProps(state) {
    return {
        authenticated: state.user.authenticated,
        me: state.user.me
    };
}

export default connect(mapStateToProps, { checkAuthenticationAction, logoutAction })(App);

function PrivateRoute({ children, authenticated, ...rest }) {

    return (
        <Route
            path={rest.path}
            render={({ location }) => authenticated ? (children) : (<Redirect to={{ pathname: "/login", state: { from: location } }}/>) }
        />
    );
}

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool,
    path: PropTypes.string
};
