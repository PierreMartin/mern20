import React from 'react';
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

function AppPage({ children, meta, title, link }) {
    return (
        <div>
            <Helmet>
                {meta && <meta charSet="utf-8" name={meta.name || ''} content={meta.content || ''} />}
                {title && <title>{title}</title>}
                {link && <link rel="canonical" href={link} />}
            </Helmet>

            {children}
        </div>
    );
}

AppPage.propTypes = {
    meta: PropTypes.any,
    link: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any
};

export default AppPage;
