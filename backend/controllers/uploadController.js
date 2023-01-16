const asyncHandler = require("express-async-handler");

const Blog = require("../models/blogSchema");

const uploadBlog = asyncHandler(async (req, res) => {
  const { title, blogContent } = req.body;

  const blog = await Blog.create({
    title: req.body.title,
    blogContent: req.body.blogContent,
  });

  if (blog) {
    console.log("Blog created successfully ");
    res.status(201).json({
      _id: blog._id,
      title: blog.title,
      blogContent: blog.blogContent,
    });
  } else {
    res.status(400);
    throw new Error("Error occured");
  }

  // res.json({
  //   title,
  //   blogContent,
  // });
});

const getBlogs = asyncHandler(async (req, res) => {
  const posts = await Blog.find().sort({ _id: -1 }).limit(6);
  console.log(posts);
  res.json(posts);
});

module.exports = { uploadBlog, getBlogs };
