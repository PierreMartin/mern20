import React from 'react';
// import PropTypes from "prop-types";
import { Menu } from 'antd';
import { PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import './navBarSide.less';

const { SubMenu } = Menu;

function NavBarSide() {
    const location = useLocation();

    return (
        <div id="bo-nav-bar-side">
            <div className="logo" title="Logo Here">
                <Link to="/dashboard">Logo Here</Link>
            </div>

            <Menu
                className="side-menu"
                selectedKeys={[location.pathname]}
                mode="inline"
            >
                <Menu.Item key="/dashboard" title="dashboard" icon={<PieChartOutlined />}>
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>

                <Menu.Item key="/users" title="Users" icon={<UserOutlined />}>
                    <Link to="/users">Users</Link>
                </Menu.Item>

                <SubMenu key="team" title="Team" icon={<TeamOutlined />}>
                    <Menu.Item key="team1">Team 1</Menu.Item>
                    <Menu.Item key="team2">Team 2</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

NavBarSide.propTypes = {
    //
};

export default NavBarSide;
