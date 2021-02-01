import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import NavBarMain from "../../NavBarMain/NavBarMain";
import '../../../../css/mainFo.less';
import './layoutMainFo.less';

const { Header, Footer, Content } = Layout;

export function LayoutMainFo({ children }) {
    return (
        <div id="fo">
            <Layout>
                <Header className="layout header-fixed">
                    <NavBarMain />
                </Header>

                <Content className="layout content header-fixed-offset">
                    {children}
                </Content>

                <Footer className="layout">
                    PMA ©2021
                </Footer>
            </Layout>
        </div>
    );
}

LayoutMainFo.propTypes = {
    children: PropTypes.any
};
