import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./App.css";

function TopNews() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAllTopStories() {
            try {
                const res = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
                const data = res.data;
                const stories = data
                    .slice(0, 10)
                    .map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    );

                const result = await Promise.all(stories);
                setPosts(result);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllTopStories()
    }, []);
    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <h1 className="postHeading">HackerNews Top 10 Posts</h1>
                    <ul style={{textAlign:"center",marginRight: "4em"}}>
                        {posts.map((post) => (
                                <li className="posts" key={post.data.id}>
                                    <a className="postLink" href={post.data.url}>{post.data.title}</a>
                                    <br />
                                    <Link className="linkTag" to={`/comments/${post.data.id}`}>
                                        <button className="viewComments">Views Comments</button>
                                    </Link>
                                </li>
                        ))}
                    </ul>
                </div>
            )
            }
        </>
    )
}

export default TopNews;
