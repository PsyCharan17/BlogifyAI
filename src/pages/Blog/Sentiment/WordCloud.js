import React from "react";
import Bs64 from "./Bs64";

const WordCloud = (props) => {
  // console.log(Bs64);
  var image = new Image();
  console.log(props.word);
  image.src = "data:image/png;base64,iVBORw0K...";
  return (
    <div>
      <h3 style={{ margin: "10px 25px" }}>WordCloud</h3>
      <hr
        style={{
          width: "90%",
          margin: "0px auto",
          height: "2px",
          backgroundColor: "black",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      ></hr>
      <img
        src={`data:image/png;base64,${props.word}`}
        style={{
          // width: "300px",
          width: "100%",
          height: "100%",
          // objectFit: "contain",
          padding: "10px 5px",
        }}
      />
    </div>
  );
};

export default WordCloud;
