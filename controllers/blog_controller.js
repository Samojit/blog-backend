import mongoose from 'mongoose';

import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    return console.error(error);
  }

  if (!blogs) {
    return res.status(404).json({ message: "Blogs not found" });
  }

  return res.status(200).json({ blogs });
};

export const createBlog = async (req, res, next) => {
  const { title, content, author } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(author);
    console.log(existingUser);
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const blog = new Blog({
    title,
    content,
    author: existingUser._id,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return console.log(error);
    return res.satatus(500).json({ message: error.message });
  }

  return res.status(201).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let specificBlog = await Blog.findById({ id });
  } catch (error) {
    return console.log(error);
  }

  if (!specificBlog) {
    return res.status(204).json(specificBlog);
  }
  res.status(200).json(specificBlog);
};
