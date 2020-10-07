const comment = require('./../Models/commentModel')
const handleFactory = require('./handleFactory')
exports.getAllComments = handleFactory.getAll(comment);
exports.createComments = handleFactory.createOne(comment);
exports.updateComments = handleFactory.updateOne(comment);
exports.deleteComments = handleFactory.deleteOne(comment);