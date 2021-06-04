import React, { useState, useEffect } from "react";
import querystring from "query-string";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Message from "./Message";
import AddMessage from "./AddMessage";
import "./Chat.css";
import Header from "./Header";
const ENDPOINT = "https://socket-io-chat-456.herokuapp.com/";

let socket;

export default function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const userName = useSelector((state) => state.user);

  useEffect(() => {
    const { room } = querystring.parse(location.search);
    socket = io(ENDPOINT);
    setName(userName);
    setRoom(room);
    socket.emit("join", { name: userName, room }, () => {});

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search, userName]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages, users]);

  function sendMessage(event, message) {
    event.preventDefault();
    if (message) socket.emit("sendMessage", message, () => {});
  }

  return (
    <>
      {room && !userName && <Redirect to={`/joinByLink?room=${room}`} />}
      <div className="chat-wrapper">
        <Header users={users} room={room} />
        <div className="chat-messages-wrapper">
          {messages.map((msg) => (
            <Message
              key={msg.user + msg.text}
              userName={msg.user}
              messageText={msg.text}
              isYourMessage={msg.user === name}
              time={msg.time}
            />
          ))}
        </div>

        <AddMessage sendMessage={sendMessage} />
      </div>
    </>
  );
}
