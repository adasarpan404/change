
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Comment = require('./../Models/commentModel')
const handleFactory = require('./handleFactory')
exports.setPostIds = (req, res, next) => {
    if (!req.body.post) req.body.post_stories = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};


exports.getAllComments = handleFactory.getAll(Comment);
exports.createComments = handleFactory.createOne(Comment);
exports.updateComments = catchAsync(async (req, res, next) => {
    const doc = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
        new: true,
        runValidators: true,
    })
    if (!doc) {
        return next(new AppError('No doc found with that Id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            doc,
        }
    })
})
exports.deleteComments = catchAsync(async (req, res, next) => {
    const docs = await Comment.findByIdAndDelete(req.params.commentId);
    if (!docs) {
        return next(new AppError('no docs found with that ID', 204));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    })
});