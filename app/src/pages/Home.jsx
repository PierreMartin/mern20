import React from 'react';
import AppPage from "./AppPage";
import './home.less';

function Home() {
    return (
        <AppPage title="Home" meta={{ name: '', content: '' }}>
            <div className="container paddings home-container">
                <h1>Welcome</h1>
            </div>
        </AppPage>
    );
}

Home.propTypes = {

};

export default Home;
