import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../../common/Chip";
import "./blogItem.css";
import { authorInfo } from "../../../../config/authorInfo";

const BlogItem = ({
  blog: {
    // description,
    title,
    blogContent,
    image0,
    // createdAt,
    // authorName,
    // authorAvatar,
    links,
    // category,
    id,
  },
}) => {
  // console.log({ links });
  return (
    <Link to={`/blog/${title}`}>
      <div className="blogItem-wrap" to={`/blog/${title}`}>
        <img className="blogItem-cover" src={image0} alt="cover" />
        {/* <Chip label={category} /> */}
        <h3>{title}</h3>
        <p className="blogItem-desc">{blogContent}</p>
        <footer>
          <div className="blogItem-author">
            <img src={authorInfo[0].avatar} alt="avatar" />
            <div>
              <h6>{authorInfo[0].name}</h6>
              {/* <p>{_id.getTimestamp()}</p> */}
            </div>
          </div>
          <Link className="blogItem-link" to={`/blog/${title}`}>
            ➝
          </Link>
        </footer>
      </div>
    </Link>
  );
};

export default BlogItem;
