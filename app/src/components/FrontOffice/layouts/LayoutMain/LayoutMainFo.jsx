import React from "react";
import PropTypes from "prop-types";
import NavBarMain from "../../NavBarMain/NavBarMain";
import '../../../../css/mainFo.less';
import './layoutMainFo.less';

export function LayoutMainFo({ children }) {
    return (
        <div id="fo">
            <NavBarMain />
            {children}
        </div>
    );
}

LayoutMainFo.propTypes = {
    children: PropTypes.any
};
