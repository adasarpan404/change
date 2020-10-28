const express = require('express');
const postController = require('./../controller/postController')
const commentController = require('./../controller/commentController')
const likeController = require('./../controller/likeController')
const authController = require('./../controller/authController')
const router = express.Router();
router.use(authController.protect);
router.route('/').get(postController.getAllPosts).post(postController.UserIds, postController.createPost);
router.get('/feed', postController.getFeed);
router.route('/:id').get(postController.getPost).patch(postController.updatePost).delete(postController.deletePost);

router.route('/:id/comments').get(commentController.getAllComments).post(commentController.setPostIds, commentController.createComments);
router.route('/:id/comments/:commentId').patch(commentController.updateComments).delete(commentController.deleteComments);
router.route('/:id/like').get(likeController.getAllLikes).post(likeController.setPostIds, likeController.createLikes);
router.route('/:id/like/:likeId').delete(likeController.deleteLikes)
module.exports = router;
