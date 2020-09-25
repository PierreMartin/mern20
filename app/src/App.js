import React, { useState, useEffect } from 'react';
import { getAllPosts } from "./services/PostService";
import './App.css';

function App() {
    const [post, setPost] = useState('');

    useEffect(() => {
        getAllPosts().then((res) => {
            setPost(res.data && res.data.posts);
        });
    }, []);

    return (
        <div className="App">
            <header>
                test test {post}
            </header>
        </div>
    );
}

export default App;
