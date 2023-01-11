import React from "react";
import marioLoading from "../Gifs/mario.gif";
import "../Loading/Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading">
        <img
          src={marioLoading}
          alt="MarioImage not found"
          width="350px"
          height="350px"
        />
        <h2 className="loading-text"> Loading... </h2>
      </div>
    </div>
  );
};

export default Loading;