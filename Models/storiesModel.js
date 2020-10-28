const mongoose = require('mongoose')
const storySchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    photo: {
        type: String,
    },
    story: {
        type: String,
    },
    caption: {
        type: String,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    nSeen: {
        type: Number,
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }



);

storySchema.virtual('seen', {
    ref: 'Seen',
    foreignField: 'story',
    localField: '_id'
});

const Story = mongoose.model('Story', storySchema);
module.exports = Story