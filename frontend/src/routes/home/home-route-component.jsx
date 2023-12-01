import React, { useState, useEffect, useRef } from 'react';
import './home-route-styles.scss';
import axios from 'axios';

const defaultFormFields = {
    title: '',
    description: '',
}
const focus = { title: false, description: false, thumbnail: false, video: false };


const Home = () => {

    const thumbnailRef = useRef(null);
    const videoRef = useRef(null);
    const baseURL = process.env.REACT_APP_BACKEND_URL;

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [loading, isloading] = useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [showFailedMsg, setShowFailedMsg] = useState(false);

    const [titleAlert, setTitleAlert] = useState('');
    const [descriptionAlert, setDescriptionAlert] = useState('');
    const [thumbnailAlert, setThumbnailAlert] = useState('');
    const [videoAlert, setVideoAlert] = useState('');

    const { title, description, thumbnail, video } = formFields;


    const validateTitle = () => {
        if (title.length < 1 && focus.title) setTitleAlert('Please Enter Title');
        else if (title.length > 50 && focus.title) setTitleAlert('Maximum 50 characters only.')
        else setTitleAlert('');
    }

    const validateDescription = () => {
        if (description.length < 1 && focus.description) setDescriptionAlert('Please Enter Description');
        else if (description.length > 200 && focus.description) setDescriptionAlert('Maximum 200 characters only.')
        else setDescriptionAlert('');
    }

    const validateThumbnail = () => {
        if (!thumbnail && focus.thumbnail) setThumbnailAlert('Please Upload Thumbnail');
        else setThumbnailAlert('');
    }

    const validateVideo = () => {
        if (!video && focus.video) setVideoAlert('Please Upload Video');
        else setVideoAlert('');
    }

    useEffect(validateTitle, [title]);
    useEffect(validateDescription, [description]);
    useEffect(validateThumbnail, [thumbnail]);
    useEffect(validateVideo, [video]);

    useEffect(() => {
        const successTimeout = setTimeout(() => {
            setShowSuccessMsg(false);
        }, 3000);

        const failedTimeout = setTimeout(() => {
            setShowFailedMsg(false);
        }, 3000);

        return () => {
            clearTimeout(successTimeout);
            clearTimeout(failedTimeout);
        };
    }, [showSuccessMsg, showFailedMsg]);

    const handleChange = (e) => {
        const { name, files } = e.target;
        focus[name] = true;

        if (name === 'thumbnail') {
            setThumbnailFile(files[0]);
        } else if (name === 'video') {
            setVideoFile(files[0]);
        } else {
            setFormFields({
                ...formFields,
                [name]: e.target.value,
            });
        }

    }

    const checkOnFocus = () => {
        for (const field in focus) {
            if (focus[field] === false) {
                return true;
            }
        }
        return false;
    }

    const turnOnFocus = () => {
        for (const field in focus) focus[field] = true;
        validateTitle();
        validateDescription();
        validateThumbnail();
        validateVideo();
    }

    const resetForm = () => {
        setFormFields(defaultFormFields);
        for (const field in focus) focus[field] = false;
        setTitleAlert('');
        setDescriptionAlert('');
        setThumbnailAlert('');
        setVideoAlert('');
        setThumbnailFile(null);
        setVideoFile(null);
        if (thumbnailRef.current) thumbnailRef.current.value = '';
        if (videoRef.current) videoRef.current.value = '';
    }

    const sendPost = async (event) => {
        event.preventDefault();
        isloading(true);
        if (titleAlert.length > 0 || descriptionAlert.length > 0 || thumbnailAlert.length > 0 || videoAlert.length > 0 || checkOnFocus()) {
            turnOnFocus();
            isloading(false);
        } else {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('thumbnail', thumbnailFile);
            formData.append('video', videoFile);

            try {
                const response = await axios.post(`${baseURL}/post`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data.success === true) {
                    setShowSuccessMsg(true);
                } else {
                    setShowFailedMsg(true);
                }
                isloading(false)
                resetForm();
            } catch (error) {
                console.log('Error: ', error);
                isloading(false);
            }
        }
    }

    return (
        <div>
            <div className="row justify-content-center m-0 mt-4">
                <p className="home-headline col-12 text-center">Upload Your Post</p>

                <form className="col-5 m-0 mt-2" encType="multipart/form-data">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name="title" id="title" placeholder="" onChange={handleChange} value={title} />
                        <label htmlFor="title">Title</label>
                        {titleAlert ? (<div className="form-alert alert-text">{titleAlert}</div>) : ('')}
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="description" name="description" placeholder="" onChange={handleChange} value={description}></textarea>
                        <label htmlFor="description">Description</label>
                        {descriptionAlert ? (<div className="form-alert text">{descriptionAlert}</div>) : ('')}

                    </div>
                    <div className="mb-3 row align-items-center">
                        <label className="form-label col-4 mt-2" htmlFor="thumbnail">Upload Thumbnail</label>
                        <div className="col-auto">
                            <input type="file" id="thumbnail" className="form-control form-control-sm" name="thumbnail" accept=".jpg, .jpeg, .png" onChange={handleChange} ref={thumbnailRef} />
                        </div>
                        {thumbnailAlert ? (<div className="form-alert">{thumbnailAlert}</div>) : ('')}

                    </div>
                    <div className="mb-3 row align-items-center file">
                        <label className="form-label col-4 mt-2" htmlFor="video">Upload Video</label>
                        <div className="col-auto">
                            <input type="file" id="video" className="form-control form-control-sm" name="video" accept=".mpg, .avi, .mp4" onChange={handleChange} ref={videoRef} />
                        </div>
                        {videoAlert ? (<div className="form-alert">{videoAlert}</div>) : ('')}

                    </div>
                    <div className="col-12 d-flex justify-content-center mt-4">
                        <button className="btn btn-primary" type="submit" onClick={sendPost}>
                            {loading ? (<div className='px-4'>
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>) : 'Submit Post'}
                        </button>
                    </div>
                </form>
                {showSuccessMsg && (
                    <div className='col-12 text-center mt-2 success'>Post Submitted Successfully</div>
                )}
                {showFailedMsg && (
                    <div className='col-12 text-center mt-2 error'>Post Submission Failed</div>
                )}


            </div>

        </div>
    );
}

export default Home;
