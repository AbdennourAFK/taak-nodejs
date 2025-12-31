const express = require('express');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/api/blogposts', require('./routes/blogposts'));
app.use('/api/comments', require('./routes/comments'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

