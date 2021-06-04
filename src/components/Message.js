import React from "react";
import "./Message.css";

export default function Message({
  userName,
  messageText,
  isYourMessage,
  time,
}) {
  const dateFormate = () => {
    const date = new Date(time);
    return date.toTimeString().split(" ")[0];
  };
  return (
    <div className="chat-message">
      <div
        className={
          isYourMessage ? "chat-user  chat-user_your-message" : "chat-user"
        }
      >
        <p className="chat-user__name">{userName}</p>
        <p className="chat-message__time">{dateFormate()}</p>
      </div>
      <p
        className={
          isYourMessage
            ? "chat-message__content chat-message__content_your-message"
            : "chat-message__content"
        }
      >
        {messageText}
      </p>
    </div>
  );
}
