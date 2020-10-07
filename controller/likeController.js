const like = require('./../Models/likeModel')
const handleFactory = require('./handleFactory')
const catchAsync = require('./../utils/catchAsync')

exports.getAllLikes = handleFactory.getAll(like);
exports.createLikes = handleFactory.createOne(like);
exports.deleteLikes = handleFactory.deleteOne(like)
