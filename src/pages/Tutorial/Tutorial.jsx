import React from "react";
import './Tutorial.css';

function Tutorial() {
  return (
    <div className="tutorial-container">
      <div className="tutorial-video">
        <h2>Como Usar o Sistema</h2>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/WisXIP9PUfw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
