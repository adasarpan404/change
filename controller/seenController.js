const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const Seen = require('./../Models/seenModel')
const handleFactory = require('./handleFactory')

exports.setPostIds = (req, res, next) => {
    if (!req.body.story) req.body.story = req.params.id;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.getAllSeen = catchAsync(async (req, res, next) => {

    const seenFeature = new APIFeatures(Seen.find({ story: req.params.id }))
    const docs = await seenFeature.query;
    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            docs,
        }
    })

});



exports.createSeen = handleFactory.createOne(Seen);