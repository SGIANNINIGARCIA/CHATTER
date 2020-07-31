import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../../components/infoBar/InfoBar";
import InputBar from "../../components/inputBar/InputBar";
import Messages from "../../components/Messages/Messages";
import TextContainer from "../../components/textContainer/textContainer";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const ENDPOINT = "https://chatter-server-backend.herokuapp.com/";
  const isMobile = window.innerWidth < 480;

  // useEffect to run as the user enters the room, and only to rerun when some major change happens.
  // The hook instantiates the socket to connect to the server and emits a join signal with the room and name.
  // once unmounted, the socket will disconenct.
  useEffect(() => {
    const { room, name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });

    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, [ENDPOINT, location.search]);

  // useEffect to retrieve new messages from the backend. Once a message is received, it is added to the messages array.
  // useEffect will only cause a re-render if the messages array is modified.
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <h1 className="titlePhone">CHATTER.</h1>
      <div className="innerContainer">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <InputBar
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      {isMobile ? null : <TextContainer users={users} />}
    </div>
  );
};

export default Chat;
