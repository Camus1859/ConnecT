import React, { useState } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignupLogin from "./components/Signup_Login";
import About from "./components/About";
import NewSearch from "./components/NewSearch";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import Welcome from "./components/Welcome";
import MySearches from "./components/MySearches.js";

function App() {
  return (
    <Router forceRefresh={true}>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Nav />
      <Switch>
        <Route exact path="/signup">
          <SignupLogin
            pageTitle={{
              page: "signup",
              UserMsg: "",
              Title:
                "Looking for someone? Find out if they are looking for you.",
              button: "Sign Up",
            }}
          />
        </Route>

        <Route exact path="/login">
          <SignupLogin
            pageTitle={{
              page: "login",
              UserMsg: "Sign In",
              Title: "",
              button: "Login",
            }}
          />
        </Route>

        <Route exact path="/user/profile">
          <Profile />
        </Route>

        <Route exact path="/search">
          <NewSearch />
        </Route>

        <Route exact path="/About">
          <About />
        </Route>

        <Route exact path="/messages">
          <Messages />
        </Route>

        <Route exact path="/mySearches">
          <MySearches />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
