import express from 'express';

import {getAllBlogs,createBlog,getBlogById} from '../controllers/blog_controller.js'

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.post('/create',createBlog);
blogRouter.get('/getBlogById/:id',getBlogById);

export default blogRouter;
