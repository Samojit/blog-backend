import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user_routes.js';
import blogRouter from './routes/blog_routes.js';

const app = express();

app.use(express.json());

app.use('/api/users',router);
app.use('/api/blogs',blogRouter);

mongoose.connect('mongodb+srv://admin:admin12345@learn-backend.xjkln00.mongodb.net/?retryWrites=true&w=majority&appName=learn-backend')
  .then(() => app.listen(3000)).then(() => console.log('Connected to database and server listening on port 3000'));



// app.use("/",(req,res,next)=>{
//     res.send("Hello, world!");
// })
