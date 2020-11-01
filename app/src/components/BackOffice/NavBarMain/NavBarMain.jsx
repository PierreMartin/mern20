import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../../reduxActions/user";

function NavBarMain({ me, logoutAction }) {
    const history = useHistory();

    return (
        <div>
            <nav className="main-nav">
                <div className="left">
                    <ul>
                        <li key="podashboardsts"><Link to="/dashboard">Dashboard</Link></li>
                        <li key="users"><Link to="/users">The users</Link></li>
                        <li key="postcreate"><Link to="/post/create">Add a new post</Link></li>
                        <li key="home"><Link to="/">Go to website</Link></li>
                    </ul>
                </div>

                <div className="right">
                    <div>
                        Welcome {me && me.firstname}
                        <button
                            onClick={() => {
                                logoutAction().then((res) => {
                                    if (res && res.payload && !res.payload.authenticated) { history.push("/"); }
                                });
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <hr />
        </div>
    );
}

NavBarMain.propTypes = {
    me: PropTypes.any,
    logoutAction: PropTypes.func
};

function mapStateToProps(state) {
    return {
        me: state.user.me
    };
}

export default connect(mapStateToProps, { logoutAction })(NavBarMain);
