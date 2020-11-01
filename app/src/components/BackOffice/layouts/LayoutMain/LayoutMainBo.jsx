import React from "react";
import PropTypes from "prop-types";
import NavBarMain from "../../NavBarMain/NavBarMain";

export function LayoutMainBo({ children }) {
    return (
        <div>
            <NavBarMain />
            {children}
        </div>
    );
}

LayoutMainBo.propTypes = {
    children: PropTypes.any
};
