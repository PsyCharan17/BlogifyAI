import React from "react";
import Odometer from "./Odometer";
import Tags from "./Tags";
import WordCloud from "./WordCloud";

const Sentiment = (props) => {
  return (
    <div>
      <Odometer value={props.value} />
      <WordCloud word={props.word} />
      <Tags tags={props.tags} />
    </div>
  );
};

export default Sentiment;
