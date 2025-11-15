// routes/posts.routes.js
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, postsController.createPost); // Protected route
router.get('/', postsController.getAllPosts);         // Public route
router.put('/:id', protect, postsController.updatePost); // Protected route
router.delete('/:id', protect, postsController.deletePost); // Protected route

module.exports = router;