import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { FrontOfficeWrapper } from "./FrontOfficeWrapper";

export function FrontOfficeRoute({ children, component: Component, ...rest }) {
    return (
        <Route
            path={rest.path}
            render={(props) => (
                <FrontOfficeWrapper key="frontOfficeWrapper">
                    <Component {...props} />
                </FrontOfficeWrapper>
            )}
        />
    );
}

FrontOfficeRoute.propTypes = {
    children: PropTypes.any,
    component: PropTypes.any,
    path: PropTypes.string
};
