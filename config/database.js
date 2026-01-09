const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string
    // Update this with your MongoDB connection string
    // For local MongoDB: mongodb://localhost:27017/blogify
    // For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/blogify
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blogify';

    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

