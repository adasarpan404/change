const Story = require('./../Models/storiesModel');
const handleFactory = require('./handleFactory');
exports.setPostIds = (req, res, next) => {

    if (!req.body.user) req.body.user = req.user.id;

    next();
};
exports.getAllStories = handleFactory.getAll(Story);
exports.getStory = handleFactory.getOne(Story);
exports.createStory = handleFactory.createOne(Story);
exports.updateStory = handleFactory.updateOne(Story);
exports.deleteStory = handleFactory.deleteOne(Story);