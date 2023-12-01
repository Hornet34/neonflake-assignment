const { uploadImage, uploadVideo, cloudinary } = require('./cloudinary.js');
const Post = require('./model.js');

const unUpload = async (files) => {
    if (files.thumbnailResult && files.thumbnailResult.public_id) {
        await cloudinary.uploader.destroy(files.thumbnailResult.public_id);
    }

    if (files.videoResult && files.videoResult.public_id) {
        await cloudinary.uploader.destroy(files.videoResult.public_id, { resource_type: 'video' });
    }
}

const uploadFiles = async (files, res) => {
    let thumbnailResult, videoResult;
    try {
        const thumbnailFile = files['thumbnail'][0].path;
        const videoFile = files['video'][0].path;

        thumbnailResult = await uploadImage(thumbnailFile);
        videoResult = await uploadVideo(videoFile);

        return { thumbnailResult, videoResult };
    } catch (error) {
        console.error('Error handling the request:', error);
        await unUpload({ thumbnailResult, videoResult });
        res.status(500).json({ success: false, error: 'Failed to upload files.' });
    }
};

const sendDataToDb = async (req, res, files) => {
    if (!files || !files.thumbnailResult || !files.videoResult) {
        return res.status(500).json({ success: false, error: 'Failed to upload files.' });
    }

    try {
        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            thumbnail: files.thumbnailResult.secure_url,
            video: files.videoResult.secure_url
        })
        await newPost.save();
        res.json({ success: true });
    } catch (e) {
        console.log('Error sending data to database:', e);
        await unUpload(files);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

const getPostsFromDb = async () => {
    try {
        const posts = await Post.find({}).populate();
        return posts;

    } catch (e) {
        console.error('Error fetching posts from the database:', e.message);
        throw e;
    }
}

module.exports = { uploadFiles, sendDataToDb, getPostsFromDb };