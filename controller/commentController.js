const comment = require('./../Models/commentModel')
const handleFactory = require('./handleFactory')
exports.setPostids = (req, res, next) => {
    if (!req.body.post) req.body.post = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};


exports.getAllComments = handleFactory.getAll(comment);
exports.createComments = handleFactory.createOne(comment);
exports.updateComments = handleFactory.updateOne(comment);
exports.deleteComments = handleFactory.deleteOne(comment);