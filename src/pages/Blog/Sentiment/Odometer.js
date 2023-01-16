import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const Odometer = (props) => {
  return (
    <div>
      <h3 style={{ margin: "10px 25px" }}> Sentiment Analysis</h3>
      <hr
        style={{
          width: "90%",
          margin: "0px auto",
          height: "3px",
          backgroundColor: "black",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      ></hr>
      <div
        style={{
          width: "500px",
          height: "200px",
        }}
      >
        <ReactSpeedometer
          maxValue={200}
          segments={3}
          // startColor="green"
          // endColor="red"
          segmentColors={["#ff2c2c", "#FFFF00", "#39e75f"]}
          value={props.value}
          needleHeightRatio={0.5}
          labelFontSize={"15px"}
          valueTextFontSize={"23px"}
          needleTransition="easeElastic"
          needleTransitionDuration={3000}
          textColor={"#000000"}
          customSegmentLabels={[
            {
              text: "Negative",
              position: "INSIDE",
              color: "#000000",
            },
            {
              text: "Neutral",
              position: "INSIDE",
              color: "#000000",
              fontSize: "19px",
            },
            {
              text: "Positive",
              position: "INSIDE",
              color: "#000000",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Odometer;
