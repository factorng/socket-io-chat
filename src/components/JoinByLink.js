import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import querystring from "query-string";
import { useDispatch } from "react-redux";
import { set_user } from "../store/actions/actions";
import "./JoinByLink.css";

export default function Join({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { room } = querystring.parse(location.search);
    if (room) setRoom(room);
  }, [location.search]);

  const submitHandler = (event) => {
    if (!name || !room) event.preventDefault();
    dispatch(set_user(name));
    history.push(`/chat?room=${room}`);
  };

  return (
    <div className="join-by-link-wrapper">
      <form className="join-by-link" onSubmit={submitHandler}>
        <h1 className="join-by-link__header">
          You has joined to the room "{room}"
        </h1>
        <label className="join-by-link__input-label">Enter your name</label>
        <input
          placeholder="Name"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
        <button className="join-by-link__button" type="submit">
          Join
        </button>
      </form>
    </div>
  );
}
