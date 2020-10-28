const handleFactory = require('./handleFactory')
const User = require('./../Models/userModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');
exports.limitFollower = (req, res, next) => {
    req.query.fields = 'follower';
    next();
}
exports.setFollowFields = (req, res, next) => {
    req.body.follower = req.params.userId;
    req.body.following = req.user.id;
    next();
}
exports.getAllfollower = handleFactory.getAll(User);
exports.getFollower = handleFactory.getOne(User);
exports.createFollower = catchAsync(async (req, res, next) => {
    const { follower, following } = req.body;
    console.log(follower, following)
    const user = await User.findById(follower);

    const user_following = user.following;
    user_following.forEach((el) => {
        console.log(el)
        if (following == el) {
            console.log(el)
            return next(new AppError("you already follow this account", 404));
        }
    })

    const currentUser = await User.findByIdAndUpdate(follower, { $push: { following: following } });
    const followerUser = await User.findByIdAndUpdate(following, { $push: { follower: follower } });
    res.status(200).json({
        status: 'success',
        data: {
            currentUser,
            followerUser,
        }
    })

})

