import React, { Suspense, lazy, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import { checkAuthenticationAction, logoutAction } from "./reduxActions/user";
import { BackOfficeRoute } from "./components/layouts/BackOffice/BackOfficeRoute";
import { FrontOfficeRoute } from "./components/layouts/FrontOffice/FrontOfficeRoute";
import './app.less';

const Home = lazy(() => import('./pages/Home'));
const PostAdd = lazy(() => import('./pages/PostAdd'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UsersList = lazy(() => import('./pages/UsersList'));
const User = lazy(() => import('./pages/User'));

function App({ checkAuthenticationAction, authenticated }) {
    const [isLoading, setIsLoading] = useState(true);

    let routes = [
        {
            path: "/",
            exact: true,
            component: Home,
            type: 'frontoffice'
        },
        {
            path: "/dashboard",
            exact: true,
            component: Dashboard,
            type: 'backoffice'
        },
        {
            path: "/users",
            exact: true,
            component: UsersList,
            type: 'backoffice'
        },
        {
            path: "/post/create",
            exact: true,
            component: PostAdd,
            type: 'backoffice'
        },
        {
            path: "/login",
            exact: true,
            component: Login,
            type: 'frontoffice'
        },

        // No in main menu:
        {
            path: "/user/:id",
            exact: true,
            component: User,
            type: 'backoffice'
        }
    ];

    useEffect(() => {
        checkAuthenticationAction().then(() => {
            setIsLoading(false);
        });
    }, []);

    // if (authenticated)  { routes = routes.filter((route) => route.path !== '/login'); }

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
                - mettre react Context (useContext) (juste un exemple)
                - implem bootstrap react ?
                - env de prod (npm install --production   npm run build)
                - SSR
                - Lint
                */}

                <Switch>
                    {routes.map((route, index) => {
                        switch (route.type) {
                            case 'frontoffice':
                                return <FrontOfficeRoute {...route} key={index} isLoading={isLoading} routes={routes} />;
                            case 'backoffice':
                                return <BackOfficeRoute {...route} key={index} authenticated={authenticated} isLoading={isLoading} routes={routes} />;
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
