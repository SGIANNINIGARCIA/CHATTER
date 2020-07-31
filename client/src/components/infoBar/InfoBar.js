import React from "react";

import onlineIcon from "./onlineIcon.png";
import closeIcon from "./closeIcon.png";
import topicIcon from "./topic.png";
import "./infoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={topicIcon} alt="topicIcon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
