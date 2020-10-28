const express = require('express')
const storyController = require('./../controller/storiesController');
const seenController = require('./../controller/seenController');
const authController = require('./../controller/authController')
const router = express.Router();
router.use(authController.protect)
router.route('/').get(storyController.getAllStories).post(storyController.setPostIds, storyController.createStory);
router.route('/:id').get(storyController.getStory).delete(storyController.deleteStory);
router.route('/:id/seen').get(seenController.getAllSeen).post(seenController.setPostIds, seenController.createSeen);


module.exports = router;





