const mongoose = require('mongoose')
const Post = require('./postModel')
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
});

commentSchema.pre(/^find/, function (next) {
    this.populate(
        {
            path: 'User',
            select: 'name photo'
        }
    )
    next();
}
);
commentSchema.statics.calcNoOfComments = async function (post) {
    const stats = await this.aggregate([{
        $match: { post: post }
    },
    {
        $group: {
            _id: '$post',
            nLikes: { $sum: 1 }
        }
    }])

    Post.findByIdAndUpdate(post, {
        NoOfLikes: stats[0].nLikes
    })
}
commentSchema.post('save', function () {
    this.constructor.calcNoOfComments(this.post)
});
commentSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
});
commentSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcNoOfComments(this.r.post);

})
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment