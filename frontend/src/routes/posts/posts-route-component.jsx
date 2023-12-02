import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './posts-route-styles.scss';

const Posts = () => {
    const baseURL = process.env.REACT_APP_BACKEND_URL;
    const [postsData, setPostsData] = useState([]);
    const [loading, isLoading] = useState(true)
    const navigate = useNavigate();

    const getPosts = async () => {
        try {
            const response = await axios.get(`${baseURL}/post`);
            setPostsData(response.data)
            if (response.data.length === 0) isLoading(false);
        }
        catch (e) {
            console.log('error here', e);
            isLoading(false);
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
                {postsData.length === 0 && loading ? (<div class="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>) : (!loading ? (<div className='col-12 text-center mt-2 fail'>Failed To Get Posts</div>) : postsElements)}

            </div>
        </div>
    )
}

export default Posts;