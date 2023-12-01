import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './posts-route-styles.scss';

const Posts = () => {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const [postsData, setPostsData] = useState([]);
    const navigate = useNavigate();

    const getPosts = async () => {
        try {
            const response = await axios.get(`${baseURL}/post`);
            setPostsData(response.data)
        }
        catch (e) {
            console.log('error', e)
        }
    }
    useEffect(() => { getPosts() });

    const viewPost = (post) => {
        navigate('/single-post', { state: post })
    }

    const postsElements = postsData.map(post => (
        <div key={post.id} className="card mx-2 mt-2" style={{ width: '18rem' }} onClick={() => { viewPost(post) }}>
            <img src={post.thumbnail} className="card-img-top" alt="..." />
            <div className="card-body">
                <p className="card-text">{post.title}</p>
            </div>
        </div>
    ));

    return (
        <div>
            <p className="posts-page-headline row m-0 justify-content-center mt-3"> Posts</p>
            <div className="row m-0 justify-content-center mt-3">
                {postsElements}
            </div>
        </div>
    )
}

export default Posts;