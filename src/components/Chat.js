import React, { useState, useEffect } from "react";
import querystring from "query-string";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Message from "./Message";
import AddMessage from "./AddMessage";
import Preloader from "./Preloader";
import "./Chat.css";
import Header from "./Header";
const ENDPOINT = "https://socket-io-chat-456.herokuapp.com/";
//const ENDPOINT = "http://localhost:5000/";

export default function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatWrapperRef = React.useRef(null);
  const socket = React.useRef(io(ENDPOINT));

  const userName = useSelector((state) => state.user);

  useEffect(() => {
    const { room } = querystring.parse(location.search);
    setName(userName);
    setRoom(room);
    socket.current.emit("join", { name: userName, room }, () => {});
    socket.current.on("message", (message) => {
      setMessages((prevState) => [...prevState, message]);
      chatWrapperRef.current.scrollTo({
        top: chatWrapperRef.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    });
    socket.current.on("roomData", ({ users }) => {
      setUsers(users);
    });
    return () => {
      socket.current.disconnect();
      socket.current.off();
    };
  }, [location.search, userName]);

  useEffect(() => {
    socket.current.connected && setIsLoading(false);
  }, [socket.current.connected]);

  function sendMessage(message) {
    if (message) socket.current.emit("sendMessage", message, () => {});
  }

  return (
    <>
      {room && !userName && <Redirect to={`/joinByLink?room=${room}`} />}
      <div className="chat-wrapper">
        <Header users={users} room={room} />
        <div className="chat-messages-wrapper" ref={chatWrapperRef}>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              {messages.map((msg, i) => (
                <Message
                  key={i}
                  userName={msg.user}
                  messageText={msg.text}
                  isYourMessage={msg.user === name}
                  time={msg.time}
                />
              ))}
            </>
          )}
        </div>

        <AddMessage sendMessage={sendMessage} />
      </div>
    </>
  );
}
