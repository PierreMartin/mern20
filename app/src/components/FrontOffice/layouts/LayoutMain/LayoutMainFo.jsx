import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import { ThemeContext } from "../../Theme/ThemeContext";
import NavBarMain from "../../NavBarMain/NavBarMain";
import '../../../../css/mainFo.less';
import './layoutMainFo.less';

const { Header, Footer, Content } = Layout;

export function LayoutMainFo({ children }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (typeof document !== 'undefined') { document.body.className = theme; }
        setTheme(theme);
    }, []);

    const onChangeTheme = (theme) => {
        if (typeof document !== 'undefined') { document.body.className = theme; }
        setTheme(theme);
    }

    return (
        <div id="fo">
            <Layout>
                <ThemeContext.Provider value={theme}>
                    <Header className="layout header-fixed">
                        <NavBarMain onChangeTheme={onChangeTheme} />
                    </Header>

                    <Content className="layout content header-fixed-offset">
                        {children}
                    </Content>

                    <Footer className="layout">
                        PMA ©2021
                    </Footer>
                </ThemeContext.Provider>
            </Layout>
        </div>
    );
}

LayoutMainFo.propTypes = {
    children: PropTypes.any
};
