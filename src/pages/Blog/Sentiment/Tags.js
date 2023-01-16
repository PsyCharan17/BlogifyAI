import React from "react";
import Chip from "../../../components/common/Chip";

const Tags = (props) => {
  return (
    <div>
      <h3 style={{ margin: "10px 25px" }}>Related Tags</h3>
      <hr
        style={{
          width: "90%",
          margin: "0px auto",
          height: "3px",
          backgroundColor: "black",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      ></hr>
      <div style={{ margin: "10px 25px", display: "flex", flexWrap: "wrap" }}>
        {props.tags.map((category, i) => (
          <div key={i} style={{ margin: "4px 5px" }}>
            <Chip label={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
