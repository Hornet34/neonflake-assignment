

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    description: String,
    thumbnail: String,
    video: String,
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
