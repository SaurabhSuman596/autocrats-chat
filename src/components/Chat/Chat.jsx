import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/Message";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

let socket;

const ENDPOINT = "https://ambikan-chat.herokuapp.com/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("connected");
      setId(socket.id);
    });
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>AMBIKANS</h2>
          <a href="/">
            <span>
              <CloseIcon />
            </span>
          </a>
        </div>
        <ReactScrollToBottom className="chatbox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              key={item.id}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
            placeholder="Type Your Message...."
          />
          <button onClick={send} className="sendBtn">
            <SendIcon className="hoverbtn" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
