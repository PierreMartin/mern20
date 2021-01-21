import React from "react";
// import PropTypes from "prop-types";
import { Menu } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import './navBarSide.less';

const { SubMenu } = Menu;

function NavBarSide() {
    return (
        <div id="nav-bar-side">
            <div className="logo">Logo Here</div>
            <Menu defaultSelectedKeys={['1']} mode="inline" style={{ height: '100%', borderRight: 0 }}>
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </div>
    );
}

NavBarSide.propTypes = {
    //
};

export default NavBarSide;
