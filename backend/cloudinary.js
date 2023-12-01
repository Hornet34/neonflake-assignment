const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadImage = async (image) => {
    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'post-thumbnail' });
        return result;
    } catch (error) {
        console.error('Error uploading image:', error.message);
        return { error: 'Failed to upload image.' };
    }
};

const uploadVideo = async (video) => {
    try {
        const result = await cloudinary.uploader.upload(video, {
            folder: 'post-videos',
            resource_type: 'video',
        })
        return result;
    } catch (error) {
        console.error('Error uploading video:', error);
    }
};

module.exports = { uploadImage, uploadVideo, cloudinary };
