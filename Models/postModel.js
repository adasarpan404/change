const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'post/blog must have a name']
    },
    userName: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comment: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    like: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],

    createdAt: {
        type: Date,
        default: Date.now()
    },
}
    , {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

const Post = mongoose.model('Post', postSchema);
module.exports = Post