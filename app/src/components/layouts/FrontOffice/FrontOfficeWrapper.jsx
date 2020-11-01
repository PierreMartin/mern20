import React from "react";
import PropTypes from "prop-types";
import NavBarMain from "../../FrontOffice/NavBarMain/NavBarMain";

export function FrontOfficeWrapper({ children }) {
    return (
        <div>
            <NavBarMain />
            {children}
        </div>
    );
}

FrontOfficeWrapper.propTypes = {
    children: PropTypes.any
};
