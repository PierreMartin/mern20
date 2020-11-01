import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { BackOfficeWrapper } from "./BackOfficeWrapper";

export function BackOfficeRoute({ children, authenticated, isLoading, component: Component, ...rest }) {
    const routeComponent = (props) => {
        return authenticated ? (
            <BackOfficeWrapper key="backOfficeWrapper">
                <Component {...props} />
            </BackOfficeWrapper>
        ) : (
            (!isLoading && <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>)
        );
    };

    return <Route path={rest.path} render={routeComponent} />;
}

BackOfficeRoute.propTypes = {
    authenticated: PropTypes.bool,
    path: PropTypes.string,
    isLoading: PropTypes.bool,
    component: PropTypes.any
};
