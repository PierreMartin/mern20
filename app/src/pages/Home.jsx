import React, { useState, useEffect } from 'react';
import { getAllPosts } from "../services/PostService";
import '../css/main.css';
import './home.css';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((res) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <div className="home">
            HOME

            <div>
                <ul>
                    {
                        (posts.length > 0 ) && posts.map((post, index) => {
                            return <li key={index}>{post.title}</li>;
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Home;
