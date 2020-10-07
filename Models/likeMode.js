const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    createdAt: {

    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    User: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like