const mongoose = require('mongoose')
const Post = require('./../Models/postModel')
const likeSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    posts: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
likeSchema.index({ posts: 1, user: 1 }, { unique: true });
likeSchema.statics.calcNoOfLikes = async function (post) {

    const stats = await this.aggregate([{
        $match: { posts: post }
    }, {
        $group: {
            _id: '$post',
            nLikes: { $sum: 1 }
        }
    }

    ]);
    await Post.findByIdAndUpdate(post, {
        NoOfLikes: stats[0].nLikes
    });
};
likeSchema.post('save', function () {
    this.constructor.calcNoOfLikes(this.posts);
})
likeSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
})

likeSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcNoOfLikes(this.r.posts);
})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like