import React, { useState } from "react";
import "./AddMessage.css";

export default function AddMessage({ sendMessage }) {
  const [message, setMessage] = useState("");
  return (
    <div className="add-message">
      <form
        className="form-add-message"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage(message.trim());
          setMessage("");
        }}
      >
        <input
          className="form-add-message__input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="form-add-message__button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
