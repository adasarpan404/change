const Post = require('./../Models/postModel')
const handleFactory = require('./handleFactory')
exports.getAllPosts = handleFactory.getAll(Post);
exports.getPost = handleFactory.getOne(Post);
exports.createPost = handleFactory.createOne(Tour);
exports.updatePost = handleFactory.updateOne(Tour);
exports.deletePost = handleFactory.deleteOne(Tour);