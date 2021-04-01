import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import { checkAuthenticationAction, logoutAction } from "./reduxActions/user";
import { LayoutMainFo } from "./components/FrontOffice/layouts/LayoutMain/LayoutMainFo";
import { LayoutMainBo } from "./components/BackOffice/layouts/LayoutMain/LayoutMainBo";
import routes from "./routes";
import { __SERVERSIDE__ } from "./config/appconfig";
import './css/main.less';

function App({ checkAuthenticationAction, authenticated }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthenticationAction().then(() => {
            setIsLoading(false);
        });
    }, []);

    let Wrapper = Suspense;
    if (__SERVERSIDE__) {
        Wrapper = 'div'; // TODO remove it   => if (loading) { return (<div>loading...</div>) }
    }

    // if (authenticated)  { routes = routes.filter((route) => route.path !== '/login'); }

    return (
        <Wrapper
            fallback={
                <div className="h-screen w-screen flex items-center justify-center">
                    <Spin size="large" />
                </div>
            }
        >
            <div>
                {/*
                TODO
                - Lint
                - Pagination GraphQl
                - Oauth (autorisations)
                */}

                <Switch>
                    {routes.map((route, index) => {
                        const Component = route.component;

                        switch (route.type) {
                            case 'frontoffice':
                                return (
                                    <Route
                                        key={index}
                                        exact={route.exact}
                                        path={route.path}
                                        render={(props) => (
                                            <LayoutMainFo>
                                                <Component {...props} />
                                            </LayoutMainFo>
                                        )}
                                    />
                                );
                            case 'backoffice':
                                const routeComponent = (props) => {
                                    return authenticated ? (
                                        <LayoutMainBo>
                                            <Component {...props} />
                                        </LayoutMainBo>
                                    ) : (
                                        (!isLoading && <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>)
                                    );
                                };

                                return (
                                    <Route
                                        key={index}
                                        exact={route.exact}
                                        path={route.path}
                                        render={routeComponent}
                                    />
                                );
                            default:
                                return (
                                    <Route
                                        key={index}
                                        exact={true}
                                        {...route}
                                    />
                                );
                        }
                    })}
                </Switch>
            </div>
        </Wrapper>
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
