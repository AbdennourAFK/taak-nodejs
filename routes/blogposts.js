const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogpostController');

// GET /api/blogposts - List all blog posts (supports pagination and search)
router.get('/', blogPostController.getAllBlogPosts);

// GET /api/blogposts/:id - Get a single blog post
router.get('/:id', blogPostController.getBlogPostById);

// POST /api/blogposts - Create a new blog post
router.post('/', blogPostController.createBlogPost);

// PUT /api/blogposts/:id - Update a blog post
router.put('/:id', blogPostController.updateBlogPost);

// DELETE /api/blogposts/:id - Delete a blog post
router.delete('/:id', blogPostController.deleteBlogPost);

module.exports = router;

