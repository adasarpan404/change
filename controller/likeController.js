const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Like = require('./../Models/likeModel')
const handleFactory = require('./handleFactory')
exports.setPostIds = (req, res, next) => {

    if (!req.body.posts) req.body.posts = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getAllLikes = catchAsync(async (req, res, next) => {
    const likeFeature = new APIFeatures(Like.find({ posts: req.params.id }));
    const docs = await likeFeature.query;
    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            docs,
        }
    })
});
exports.createLikes = handleFactory.createOne(Like);
exports.deleteLikes = catchAsync(async (req, res, next) => {
    console.log(req.params.likeId)
    const docs = await Like.findByIdAndDelete(req.params.likeId);
    if (!docs) {
        return next(new AppError('No docs found with that ID', 204))
    }
    res.status(204).json({
        status: 'success',
        data: null,
    })
});
