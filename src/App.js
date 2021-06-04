import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";
import JoinByLink from "./components/JoinByLink";
import history from "./history";
import "./App.css";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/joinByLink" component={JoinByLink} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}
