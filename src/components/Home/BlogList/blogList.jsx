import React from "react";
import BlogItem from "./BlogItem/blogItem";
import "./blogList.css";

const BlogList = ({ blogs }) => {
  console.log("Inside blogList.jsx");
  console.log(blogs);

  return (
    <div className="blogList-wrap">
      {blogs.map((blog) => (
        <BlogItem blog={blog} />
      ))}
      {/* <h3>BLog list component</h3> */}
    </div>
  );
};

export default BlogList;
