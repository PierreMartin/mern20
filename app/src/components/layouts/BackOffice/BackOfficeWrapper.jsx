import React from "react";
import PropTypes from "prop-types";
import NavBarMain from "../../BackOffice/NavBarMain/NavBarMain";

export function BackOfficeWrapper({ children }) {
    return (
        <div>
            <NavBarMain />
            {children}
        </div>
    );
}

BackOfficeWrapper.propTypes = {
    children: PropTypes.any
};
