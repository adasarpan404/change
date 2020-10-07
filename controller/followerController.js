const handleFactory = require('./handleFactory')
const User = require('./../Models/userModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
exports.limitFollower = (req, res, next) => {
    req.query.fields = 'follower';
    next();
}
exports.getAllfollower = handleFactory.getAll(User);
exports.getFollower = handleFactory.getOne(User);
exports.createFollower = catchAsync(async (req, res, next) => {
    console.log(req.params.userId);

    let doc = await User.findOne({ _id: req.params.userId });
    let user = await User.findById(req.user.id);
    Object.keys(doc).forEach((el) => {
        if (el == req.params.userId) {
            return next(new AppError("you already follow this account ", 400))
        }
    })
    console.log(doc)
    const newFollowing = doc.id;
    const newfollower = req.user.id;
    user.following.push(newFollowing)
    doc.follower.push(newfollower);

    await doc.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        user, doc,
    })

})

