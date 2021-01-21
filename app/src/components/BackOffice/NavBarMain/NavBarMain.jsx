import React from "react";
import PropTypes from "prop-types";
import { Menu } from 'antd';
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../../reduxActions/user";
import './navBarMain.less';

function NavBarMain({ me, logoutAction }) {
    const history = useHistory();

    return (
        <div id="bo-nav-bar-main">
            <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>

            {/* Old approach:
            <nav className="bo-nav-bar-main">
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
            */}
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
