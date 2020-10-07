import React from 'react';
import AppPage from "./AppPage";
import '../css/main.less';
import './home.less';

function Home() {
    return (
        <AppPage title="Home" meta={{ name: '', content: '' }}>
            <div className="home-container paddings">
                <h1>Welcome</h1>
            </div>
        </AppPage>
    );
}

Home.propTypes = {

};

export default Home;
