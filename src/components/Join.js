import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { set_user } from "../store/actions/actions";
import "./Join.css";

export default function Join({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (event) => {
    if (!name || !room) event.preventDefault();
    dispatch(set_user(name));
    history.push(`/chat?room=${room}`);
  };

  return (
    <div className="join-wrapper">
      <form className="join" onSubmit={submitHandler}>
        <h1 className="join__header">Join to the chat</h1>
        <label className="join__input-label">Enter your name</label>
        <input
          placeholder="Name"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
        <label className="join__input-label">Enter a room name</label>
        <input
          placeholder="Room"
          type="text"
          onInput={(event) => setRoom(event.target.value)}
        />
        <button className="join__button" type="submit">
          Join
        </button>
      </form>
    </div>
  );
}
