import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";
import JoinByLink from "./components/JoinByLink";
import history from "./history";
import "./App.css";

export default function App() {
  return (
    <Router history={history}>
      <Route path="/" exact component={Join} />
      <Route path="/join" exact component={Join} />
      <Route path="/joinByLink" component={JoinByLink} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
}
