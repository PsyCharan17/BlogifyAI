import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { blogList } from "../../config/data";
import Chip from "../../components/common/Chip";
import EmptyList from "../../components/common/EmptyList";
import "./blog.css";
import { Link } from "react-router-dom";
import Odometer from "./Sentiment/Odometer";
import Sentiment from "./Sentiment/Sentiment";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const gettingBlogs = async () => {
    try {
      // console.log("inside gettingblogs ");
      await axios
        .post("http://localhost:5000/api/upload/getBlogs", {})
        .then((res) => {
          // res.data.map((blog) => {
          //   blog.id = setIdCounter(idCounter + 1);
          //   // console.log(blog.id);
          // });
          console.log("inside gettingblogs ");
          console.log(res.data);
          console.log("inside gettingblogs");
          const recentBlogs = res.data;
          recentBlogs.map((blog) => {
            if (blog.title === id) {
              setBlog(blog);
            }
          });
        });
      console.log(blog);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // let blog = blogList.find((blog) => blog.id === parseInt(id));
    // if (blog) {
    //   setBlog(blog);
    // }
    gettingBlogs();
  }, []);

  return (
    <>
      <Link className="blog-goBack" to="/">
        <span> &#8592;</span> <span>Go Back</span>
      </Link>
      {blog ? (
        <div className="blog-wrap">
          {/* <Odometer sentiment={80} /> */}
          <div
            className="sentiment-container"
            style={{ backgroundColor: "#FAF9F6" }}
          >
            <Sentiment
              value={blog.sentimentAnalysis}
              word={blog.wordCloud}
              tags={blog.keywords}
            />
          </div>
          <header>
            <p className="blog-date">Published {blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <div className="blog-subCategory">
              {blog.keywords.map((category, i) => (
                <div key={i}>
                  <Chip label={category} />
                </div>
              ))}
            </div>
          </header>
          <img src={blog.image1} alt="cover" />
          <p className="blog-desc">{blog.blogContent}</p>
          <img src={blog.image4} alt="cover" />
          <img src={blog.image5} alt="cover" />
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default Blog;
