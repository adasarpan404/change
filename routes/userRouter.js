const express = require('express');
const authController = require('./../controller/authController')
const userController = require('./../controller/userController')
const followerController = require('./../controller/followerController')
const router = express.Router();

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/:userId/follow').get(followerController.limitFollower, followerController.getAllfollower).patch(userController.paramsWhat, followerController.createFollower);
module.exports = router;
