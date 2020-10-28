const mongoose = require('mongoose');
const Story = require('./storiesModel')
const seenSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    story: {
        type: mongoose.Schema.ObjectId,
        ref: 'Story'
    }, user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
seenSchema.index({ story: 1, user: 1 }, { unique: true });

seenSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
});

seenSchema.statics.calcNoOfSeen = async function (stories) {
    const stats = await this.aggregate([{
        $match: { story: stories }
    }, {
        $group: {
            _id: '$story',
            nSeen: { $sum: 1 }
        }
    }]);
    console.log(stats)
    await Story.findByIdAndUpdate(stories, {
        nSeen: stats[0].nSeen
    })
};
seenSchema.post('save', function () {
    this.constructor.calcNoOfSeen(this.story);
});
seenSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    next();
})
seenSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcNoOfSeen(this.r.story)
})
const Seen = mongoose.model('Seen', seenSchema);
module.exports = Seen;