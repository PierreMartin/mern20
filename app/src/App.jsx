import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { checkAuthenticationAction, logoutAction } from './reduxActions/user';
import { LayoutMainFo } from './components/FrontOffice/layouts/LayoutMain/LayoutMainFo';
import { LayoutMainBo } from './components/BackOffice/layouts/LayoutMain/LayoutMainBo';
import routes from './routes';
import './css/main.less';

function App({ checkAuthenticationAction, authenticated }) {
    useEffect(() => {
        checkAuthenticationAction();
    }, []);

    return (
        <div>
            {/*
            TODO
            - Pagination GraphQl
            - Oauth (autorisations)
            */}

            <Switch>
                {routes.map((route, index) => {
                    const Component = route.component;

                    // Do redirections:
                    if (authenticated === 'true' && route.path === '/login') {
                        return (
                            <Route
                                key={index}
                                exact={route.exact}
                                path={route.path}
                                render={(props) => (
                                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                                )}
                            />
                        );
                    }

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
                            return (
                                <Route
                                    key={index}
                                    exact={route.exact}
                                    path={route.path}
                                    render={(props) => {
                                        return authenticated === 'true' ? (
                                            <LayoutMainBo>
                                                <Component {...props} />
                                            </LayoutMainBo>
                                        ) : (
                                            (authenticated === 'false' && <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
                                        );
                                    }}
                                />
                            );
                        default:
                            return (
                                <Route
                                    key={index}
                                    exact
                                    {...route}
                                />
                            );
                    }
                })}
            </Switch>
        </div>
    );
}

App.serverFetch = checkAuthenticationAction; // SSR - Data requirements for isomorphic fetch

App.propTypes = {
    location: PropTypes.any,
    authenticated: PropTypes.string.isRequired,
    checkAuthenticationAction: PropTypes.func.isRequired,
    logoutAction: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        authenticated: state.user.authenticated
    };
}

export default connect(mapStateToProps, { checkAuthenticationAction, logoutAction })(App);
