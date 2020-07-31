import React from "react";

import onlineIcon from "../../components/infoBar/onlineIcon.png";

import "./textContainer.css";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    <h1 className="appName">CHATTER.</h1>
    {users ? (
      <div>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img
                  style={{ position: "relative", top: "2px" }}
                  alt="Online Icon"
                  src={onlineIcon}
                />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
