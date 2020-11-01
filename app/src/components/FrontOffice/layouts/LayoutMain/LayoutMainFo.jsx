import React from "react";
import PropTypes from "prop-types";
import NavBarMain from "../../NavBarMain/NavBarMain";

export function LayoutMainFo({ children }) {
    return (
        <div>
            <NavBarMain />
            {children}
        </div>
    );
}

LayoutMainFo.propTypes = {
    children: PropTypes.any
};
