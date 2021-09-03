import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import "./App.css";
import { Link } from "react-router-dom";

export default function Comments() {
    const params = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getAllComments() {
            try {
                const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json`);
                const data = res.data.kids;
                const comments = data
                    .slice(0, 20)
                    .map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    );
                const result = await Promise.all(comments);
                setComments(result);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAllComments()
    }, [params.id]);
    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <h1 className="commentHeading">Comments</h1>
                    <Link className="linkTagCom" to={'/'}>
                        <p style={{marginRight:"2em"}} className="goBack">Go Back To News</p>
                    </Link>
                    <ul>
                        {comments.map(comments => (
                            <li className="comments" key={comments.data.id}>
                                <div dangerouslySetInnerHTML={{__html: comments.data.text}}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}