const Post = require('./../Models/postModel')
const handleFactory = require('./handleFactory')
exports.getAllPosts = handleFactory.getAll(Post);
exports.getPost = handleFactory.getOne(Post);
exports.createPost = handleFactory.createOne(Post);
exports.updatePost = handleFactory.updateOne(Post);
exports.deletePost = handleFactory.deleteOne(Post);