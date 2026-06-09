import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import router from './routes/user_routes.js';
import blogRouter from './routes/blog_routes.js';

const app = express();
const PORT = process.env.PORT || 7001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

app.use('/api/users', router);
app.use('/api/blogs', blogRouter);

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Connected to MongoDB`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });