const BlogPost = require('../models/BlogPost');

// GET /api/blogposts - List all blog posts (with pagination)
exports.getAllBlogPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const search = req.query.search || '';

    // Build query for search functionality
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const blogPosts = await BlogPost.find(query)
      .limit(limit)
      .skip(offset)
      .sort({ createdAt: -1 });

    const total = await BlogPost.countDocuments(query);

    res.json({
      data: blogPosts,
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

// GET /api/blogposts/:id - Get a single blog post
exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ data: blogPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/blogposts - Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    // Basic validation
    if (!req.body.title || !req.body.content || !req.body.author) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, and author are required' 
      });
    }

    // Check data types
    if (typeof req.body.title !== 'string' || 
        typeof req.body.content !== 'string' || 
        typeof req.body.author !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid data types: title, content, and author must be strings' 
      });
    }

    const blogPost = new BlogPost({
      title: req.body.title.trim(),
      content: req.body.content,
      author: req.body.author.trim()
    });

    const savedPost = await blogPost.save();
    res.status(201).json({ data: savedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/blogposts/:id - Update a blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Validate data types if fields are provided
    if (req.body.title !== undefined && typeof req.body.title !== 'string') {
      return res.status(400).json({ error: 'title must be a string' });
    }
    if (req.body.content !== undefined && typeof req.body.content !== 'string') {
      return res.status(400).json({ error: 'content must be a string' });
    }
    if (req.body.author !== undefined && typeof req.body.author !== 'string') {
      return res.status(400).json({ error: 'author must be a string' });
    }

    // Update fields
    if (req.body.title !== undefined) blogPost.title = req.body.title.trim();
    if (req.body.content !== undefined) blogPost.content = req.body.content;
    if (req.body.author !== undefined) blogPost.author = req.body.author.trim();

    const updatedPost = await blogPost.save();
    res.json({ data: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/blogposts/:id - Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully', data: blogPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

