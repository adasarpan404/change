const express = require('express');
const postController = require('./../controller/postController')
const commentController = require('./../controller/commentController')
const likeController = require('./../controller/likeController')
const router = express.Router();

router.route('/').get(postController.getAllPosts).post(postController.createPost);

router.route('/:id').get(postController.getPost).patch(postController.updatePost).delete(postController.deletePost);

router.route('/:id/comments').get(commentController.getAllComments).post(commentController.createComments);
router.route('/:id/comment/:commentId').patch(commentController.updateCOmments).delete(commentController.deleteComments);
router.route('/:id/like').get(likeController.createLikes).post(likeController.createLikes);
router.route('/:id/like/:likeId').delete(likeController.deleteLikes)
module.exports = router;
