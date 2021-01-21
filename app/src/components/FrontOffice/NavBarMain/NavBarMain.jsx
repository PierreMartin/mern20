import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './navBarMain.less';

function NavBarMain({ authenticated }) {
    return (
        <div>
            <nav id="fo-nav-bar-main">
                <div className="left">
                    <ul>
                        <li key="home"><Link to="/">Home</Link></li>
                        <li key="dashboard"><Link to="/dashboard">Go to dashboard</Link></li>
                        { !authenticated && <li key="login"><Link to="/login">Login</Link></li> }
                    </ul>
                </div>
            </nav>

            <hr />
        </div>
    );
}

NavBarMain.propTypes = {
    authenticated: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        authenticated: state.user.authenticated
    };
}

export default connect(mapStateToProps)(NavBarMain);
