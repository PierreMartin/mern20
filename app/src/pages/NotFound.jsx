import React from 'react';
import { Link } from 'react-router-dom';
import AppPage from './AppPage';
import './notFound.less';

const NotFound = () => (
    <AppPage title="Page not found" meta={{ name: '', content: '' }}>
        <div id="not-found-container" className="container paddings">
            <h1>404 - Not Found!</h1>
            <Link to="/">Go Home</Link>
        </div>
    </AppPage>
);

export default NotFound;
