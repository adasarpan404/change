const like = require('./../Models/likeModel')
const handleFactory = require('./handleFactory')
exports.setPostIds = (req, res, next) => {
    if (!req.body.post) req.body.post = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;
}

exports.getAllLikes = handleFactory.getAll(like);
exports.createLikes = handleFactory.createOne(like);
exports.deleteLikes = handleFactory.deleteOne(like)
