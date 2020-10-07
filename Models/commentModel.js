const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'comment cannot be empty']
    },
    createdAt: {
        type: Date,
        default: Date.now()
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment