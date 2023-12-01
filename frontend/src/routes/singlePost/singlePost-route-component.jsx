import { useLocation } from "react-router-dom";
import './singlePost-route-styles.scss'

const SinglePost = () => {

    const location = useLocation();
    const post = location.state
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <p className="title">{post.title}</p>
            <video src={post.video} classname='' controls autoPlay></video>
            <p className='mt-3 description'>{post.description}</p>
        </div>
    );
}

export default SinglePost;