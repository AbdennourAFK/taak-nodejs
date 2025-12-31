const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// GET /api/comments - List all comments (supports pagination and filtering by blogPostId)
router.get('/', commentController.getAllComments);

// GET /api/comments/:id - Get a single comment
router.get('/:id', commentController.getCommentById);

// POST /api/comments - Create a new comment
router.post('/', commentController.createComment);

// PUT /api/comments/:id - Update a comment
router.put('/:id', commentController.updateComment);

// DELETE /api/comments/:id - Delete a comment
router.delete('/:id', commentController.deleteComment);

module.exports = router;

