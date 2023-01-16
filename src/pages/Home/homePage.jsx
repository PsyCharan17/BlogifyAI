import React, { useEffect, useState } from "react";
import EmptyList from "../../components/common/EmptyList";
import BlogList from "../../components/Home/BlogList/blogList";
import Header from "../../components/Home/Header/Header";
import HeroSection from "../../components/Home/hero-section/HeroSection";
import SearchBar from "../../components/Home/SearchBar/searchBar";
import { blogList } from "../../config/data";

import axios from "axios";
const Home = () => {
  const [blogs, setBlogs] = useState(blogList);
  const [searchKey, setSearchKey] = useState("");
  const [latestPosts, setLatestPosts] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  // data=latestPosta;
  // data.every(addId)
  // let id=1;
  // const addId= (blog)=>{
  //  {...blog, id};
  //  id

  // }

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
          setLatestPosts(res.data);

          // console.log(latestPosts);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    gettingBlogs();
  }, []);
  // console.log(latestPosts);

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  // Search for blog by category
  const handleSearchResults = () => {
    const allBlogs = blogList;
    const filteredBlogs = allBlogs.filter((blog) =>
      blog.category.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    setBlogs(blogList);
    setSearchKey("");
  };

  return (
    <div>
      {/* Page Header */}
      {/* <Header /> */}
      {/* <section style={{ left: "0", width: "100vw", marginLeft: "0px" }}>
        <HeroSection />
      </section> */}

      {/* Search Bar */}
      <SearchBar
        value={searchKey}
        clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/* Blog List & Empty View */}
      {!blogs.length ? <EmptyList /> : <BlogList blogs={latestPosts} />}
    </div>
  );
};

export default Home;
