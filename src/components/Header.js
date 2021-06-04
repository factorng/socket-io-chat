import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.css";

export default function Header({ users, room }) {
  const history = useHistory();
  return (
    <header className="header">
      <div className="header__users">
        {`In the room "${room}" ${users.length} users online: `}
        {users.map((user, i) => (
          <span key={user.id}>
            <span className="header__user">{user.name}</span>
            {users.length > 1 && i < users.length - 1 && ", "}
          </span>
        ))}
      </div>
      <button onClick={() => history.push("/")} className="header__button">
        Log out
      </button>
    </header>
  );
}
