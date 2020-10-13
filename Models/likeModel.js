const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    createdAt: {

    },
    post: {
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
likeSchema.statics.calcNoOfLikes = async function (post) {
    const stats = await this.aggregate([{
        $match: { post: post }
    }, {
        $group: {
            _id: '$post',
            nLikes: { $sum: 1 }
        }
    }]);
    Post.findByIdAndUpdate(post, {
        NoOfLikes: stats[0].nLikes
    });
};
likeSchema.post('save', function () {
    this.constructor.calcNoOfLike(this.post);
})
likeSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
})

likeSchema.post(/^findOneAnd/, async function (next) {
    await this.r.constructor.calcNoOfLikes(this.r.post);
})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like