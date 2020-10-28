
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const Post = require('./../Models/postModel')
const handleFactory = require('./handleFactory')
exports.UserIds = (req, res, next) => {
    // Allow nested routes

    if (!req.body.user) req.body.user = req.user.id;
    next();
};
exports.getFeed = catchAsync(async (req, res, next) => {

    const following = req.user.following;
    console.log(req.user);
    let feed = [];
    if (following == null) {
        return next(new AppError("please follow someone", 404))
    }
    const features = new APIFeatures(Post.find(), req.query).filter().sort().limitFields().paginate();
    let docs = await features.query;
    docs.forEach((doc) => {
        const postId = doc.user._id
        following.forEach((el) => {
            console.log(el)
            if (postId == el) {
                console.log('yes');
                feed.push(doc)
            }

        })
    })
    res.status(200).json({
        status: 'success',
        results: feed.length,
        data: { feed, },

    })


})
exports.getAllPosts = handleFactory.getAll(Post);
exports.getPost = handleFactory.getOne(Post, { path: 'likes' });
exports.createPost = handleFactory.createOne(Post);
exports.updatePost = handleFactory.updateOne(Post);
exports.deletePost = handleFactory.deleteOne(Post);