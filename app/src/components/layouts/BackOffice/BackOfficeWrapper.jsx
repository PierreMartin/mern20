import React from "react";
import PropTypes from "prop-types";

export function BackOfficeWrapper({ children, routes }) {
    return (
        <div>
            {/* TODO <NavBarMain routes={routes} /> */}
            {children}
        </div>
    );
}

BackOfficeWrapper.propTypes = {
    children: PropTypes.any,
    routes: PropTypes.array
};

// TODO use redux for get authentificed + me