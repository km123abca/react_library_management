import React from "react";
import Homepage from "./Homepage";

function Landing() {
  return (
    <div
      style={{
        // backgroundColor: "#FFFF00",
        backgroundImage: `url(./cover.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "93vh",
      }}
    >
      <Homepage />
      {/* <img
        src={"/cover.jpg"}
        alt="sorry no image found"
        style={{ height: "100%", width: "100%" }}
      /> */}
    </div>
  );
}

export default Landing;
