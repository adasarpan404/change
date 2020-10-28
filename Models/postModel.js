const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'post/blog must have a content']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String,
        default: 'no captions'
    },
    NoOfLikes: {
        type: Number,
    },
    NoOfComments: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

postSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'posts',
    localField: '_id'
});
postSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id',
})
postSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;