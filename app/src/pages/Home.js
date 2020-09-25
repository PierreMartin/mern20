import React, { useState, useEffect } from 'react';
import { getAllPosts } from "../services/PostService";
import '../css/main.css';
import './home.css';

function Home() {
    const [, setPost] = useState('');

    useEffect(() => {
        getAllPosts().then((res) => {
            setPost(res.data && res.data.posts);
        });
    }, []);

    return (
        <div className="home">
            HOME
        </div>
    );
}

export default Home;
