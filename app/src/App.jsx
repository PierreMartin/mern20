import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { Spin } from "antd";
import { checkAuthenticationAction, logoutAction } from "./reduxActions/user";
import { BackOfficeRoute } from "./components/layouts/BackOffice/BackOfficeRoute";
import './app.less';

const Home = lazy(() => import('./pages/Home'));
const PostAdd = lazy(() => import('./pages/PostAdd'));
const Login = lazy(() => import('./pages/Login'));
const PostsList = lazy(() => import('./pages/PostsList'));
const UsersList = lazy(() => import('./pages/UsersList'));
const User = lazy(() => import('./pages/User'));

function App({ checkAuthenticationAction, authenticated, me, logoutAction }) {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    let routes = [
        {
            path: "/",
            title: 'Home',
            exact: true,
            component: Home,
            type: 'frontoffice'
        },
        {
            path: "/posts",
            title: 'The posts',
            component: PostsList,
            type: 'backoffice'
        },
        {
            path: "/users",
            title: 'The users',
            component: UsersList,
            type: 'backoffice'
        },
        {
            path: "/post/create",
            title: 'Add a new post',
            component: PostAdd,
            type: 'backoffice'
        },
        {
            path: "/login",
            title: 'Login',
            component: Login,
            type: 'frontoffice'
        },

        // Output of main menu:
        {
            path: "/user/:id",
            title: 'User',
            component: User,
            hideMainMenu: true,
            type: 'backoffice'
        }
    ];

    useEffect(() => {
        checkAuthenticationAction().then(() => {
            setIsLoading(false);
        });
    }, []);

    if (authenticated)  { routes = routes.filter((route) => route.path !== '/login'); }

    return (
        <Suspense
            fallback={
                <div className="h-screen w-screen flex items-center justify-center">
                    <Spin size="large" />
                </div>
            }
        >
            <div>
                {/*
                TODO
                - mettre NavBarMain dans un composent
                - mettre react Context (useContext) (juste un exemple)
                - implem bootstrap react ?
                - env de prod (npm install --production   npm run build)
                - SSR
                - Lint
                */}
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
                        switch (route.type) {
                            case 'backoffice':
                                return <BackOfficeRoute {...route} key={index} authenticated={authenticated} isLoading={isLoading} routes={routes} />;
                            case 'frontoffice':
                            // return <FrontOfficeRoute {...route} key={index} isLoading={isLoading} routes={routes} />;
                            default:
                                return <Route key={index} {...route} />;
                        }
                    })}
                </Switch>
            </div>
        </Suspense>
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
