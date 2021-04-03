import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Menu } from "antd";
import { HighlightOutlined, HighlightFilled } from '@ant-design/icons';
import { ThemeContext } from "../Theme/ThemeContext";
import './navBarMain.less';

function NavBarMain({ authenticated, onChangeTheme }) {
    const location = useLocation();
    const theme = useContext(ThemeContext);

    return (
        <div id="fo-nav-bar-main">
            <div className="logo" title="Home">
                <Link to="/">Logo Here</Link>
            </div>

            <Menu
                className="main-menu"
                selectedKeys={[location.pathname]}
                mode="horizontal"
            >
                <Menu.Item key="/dashboard" title="Dashboard">
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>

                <Menu.Item key="buttons" className="right button">
                    <div>
                        {
                            (authenticated === 'false' && location.pathname !== '/login') && (
                                <Button type="primary">
                                    <Link to="/login">Login / signup</Link>
                                </Button>
                            )
                        }

                        <Button className="with-icon" onClick={() => { onChangeTheme(theme === 'dark' ? 'light' : 'dark'); }}>
                            {theme === 'dark' ? <HighlightOutlined /> : <HighlightFilled />}
                        </Button>
                    </div>
                </Menu.Item>
            </Menu>

            {/*
            <nav>
                <div className="left">
                    <ul>
                        <li key="home"><Link to="/">Home</Link></li>
                        <li key="dashboard"><Link to="/dashboard">Go to dashboard</Link></li>
                        { !authenticated && <li key="login"><Link to="/login">Login</Link></li> }
                    </ul>
                </div>
            </nav>
            */}
        </div>
    );
}

NavBarMain.propTypes = {
    authenticated: PropTypes.string, // 'loading' | 'true' | 'false'
    onChangeTheme: PropTypes.func
};

function mapStateToProps(state) {
    return {
        authenticated: state.user.authenticated
    };
}

export default connect(mapStateToProps)(NavBarMain);
