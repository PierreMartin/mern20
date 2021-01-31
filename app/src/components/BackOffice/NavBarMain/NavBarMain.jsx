import React from "react";
import PropTypes from "prop-types";
import { Menu } from 'antd';
import { SettingOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../../reduxActions/user";
import './navBarMain.less';

const { SubMenu } = Menu;

function NavBarMain({ me, logoutAction }) {
    const history = useHistory();
    const location = useLocation();
    let titleProfil = 'My profil';
    if (me) { titleProfil = me.firstname || me.email; }

    const onLogout = () => {
        logoutAction().then((res) => {
            if (res && res.payload && !res.payload.authenticated) { history.push("/"); }
        });
    };

    return (
        <div id="bo-nav-bar-main">
            <Menu
                className="main-menu"
                selectedKeys={[location.pathname]}
                mode="horizontal"
            >
                <Menu.Item key="/post/create" title="Add a new post">
                    <Link to="/post/create">Add a new post</Link>
                </Menu.Item>

                <Menu.Item key="/website" title="Go to website">
                    <Link to="/">Go to website</Link>
                </Menu.Item>

                <SubMenu key="Profil" title={titleProfil} icon={<UserOutlined />} style={{ float: 'right' }}>
                    <Menu.Item key="/settings" title="Settings" icon={<SettingOutlined />} disabled>Settings</Menu.Item>
                    <Menu.Item key="/logout" title="Logout" icon={<LogoutOutlined />} onClick={onLogout}>Logout</Menu.Item>
                </SubMenu>
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
