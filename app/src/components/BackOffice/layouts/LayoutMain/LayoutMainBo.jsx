import React from "react";
import PropTypes from "prop-types";
import NavBarMain from "../../NavBarMain/NavBarMain";
import '../../../../css/mainBo.less';

export function LayoutMainBo({ children }) {
    return (
        <div id="bo">
            <NavBarMain />
            {children}
        </div>
    );
}

LayoutMainBo.propTypes = {
    children: PropTypes.any
};
