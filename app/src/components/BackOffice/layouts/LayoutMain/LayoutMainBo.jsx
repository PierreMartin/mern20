import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import NavBarMain from "../../NavBarMain/NavBarMain";
import NavBarSide from "../../NavBarSide/NavBarSide";
import '../../../../css/mainBo.less';
import './layoutMainBo.less';

const { Header, Footer, Sider, Content } = Layout;

export function LayoutMainBo({ children }) {
    useEffect(() => {
        if (typeof document !== 'undefined') { document.body.className = 'light'; }
    }, []);

    return (
        <div id="bo">
            <Layout>
                <Sider className="layout sider" theme="light" collapsible width={200}>
                    <NavBarSide />
                </Sider>

                <Layout>
                    <Header className="layout" style={{ height: 'inherit' }}>
                        <NavBarMain />
                    </Header>

                    <Content className="layout content">
                        {children}
                    </Content>

                    <Footer className="layout">
                        PMA ©2021
                    </Footer>
                </Layout>
            </Layout>

            {/*
            Old approach:
            <div style={{ display: 'flex' }}>
                <div style={{ width: 200, height: '100%' }}>
                    <NavBarSide />
                </div>

                <div style={{ width: '100%' }}>
                    <Header>
                        <NavBarMain />
                    </Header>

                    <Content>
                        {children}
                    </Content>

                    <Footer>
                        PMA ©2021
                    </Footer>
                </div>
            </div>
            */}
        </div>
    );
}

LayoutMainBo.propTypes = {
    children: PropTypes.any
};
