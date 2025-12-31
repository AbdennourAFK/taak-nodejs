const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// GET /api/comments - List all comments (with pagination)
exports.getAllComments = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const blogPostId = req.query.blogPostId;

    // Build query
    const query = {};
    if (blogPostId) {
      query.blogPostId = blogPostId;
    }

    const comments = await Comment.find(query)
      .populate('blogPostId', 'title')
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const total = await Comment.countDocuments(query);

    res.json({
      data: comments,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/comments/:id - Get a single comment
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('blogPostId', 'title');
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/comments - Create a new comment
exports.createComment = async (req, res) => {
  try {
    // Basic validation
    if (!req.body.blogPostId || !req.body.content || !req.body.author) {
      return res.status(400).json({ 
        error: 'Missing required fields: blogPostId, content, and author are required' 
      });
    }

    // Check data types
    if (typeof req.body.content !== 'string' || typeof req.body.author !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid data types: content and author must be strings' 
      });
    }

    // Verify blog post exists
    const blogPost = await BlogPost.findById(req.body.blogPostId);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    const comment = new Comment({
      blogPostId: req.body.blogPostId,
      content: req.body.content,
      author: req.body.author.trim()
    });

    const savedComment = await comment.save();
    const populatedComment = await Comment.findById(savedComment._id)
      .populate('blogPostId', 'title');
    
    res.status(201).json({ data: populatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/comments/:id - Update a comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Validate data types if fields are provided
    if (req.body.content !== undefined && typeof req.body.content !== 'string') {
      return res.status(400).json({ error: 'content must be a string' });
    }
    if (req.body.author !== undefined && typeof req.body.author !== 'string') {
      return res.status(400).json({ error: 'author must be a string' });
    }

    // Update fields
    if (req.body.content !== undefined) comment.content = req.body.content;
    if (req.body.author !== undefined) comment.author = req.body.author.trim();

    const updatedComment = await comment.save();
    const populatedComment = await Comment.findById(updatedComment._id)
      .populate('blogPostId', 'title');
    
    res.json({ data: populatedComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/comments/:id - Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully', data: comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

