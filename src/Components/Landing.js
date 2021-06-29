import React from "react";
import Homepage from "./Homepage";

function Landing() {
  return (
    <div
      style={{
        backgroundColor: "#FFFF00",
        height: "90vh",
      }}
    >
      <Homepage />
      <img
        src={"/cover.jpg"}
        alt="sorry no image found"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default Landing;
