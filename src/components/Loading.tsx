import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="spinner-container">
      <ThreeCircles
        height="100"
        width="100"
        color="#4f009e"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
