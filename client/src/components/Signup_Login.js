import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import UserMessages from "./UserMessages";

const SignupLogin = ({ pageTitle }) => {
  let { page, UserMsg, Title, button } = pageTitle;

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const history = useHistory();
  const [showUserMsgs, SetShowUserMsgs] = useState([]);
  const location = useLocation();
  let [locationState, UseLocationState] = useState(location.state?.msg);

  const clearLocationState = () => {
    UseLocationState(undefined);
  };

  const formSubmitHandler = async (e) => {
    console.log("a");
    e.preventDefault();

    try {
      const response = await fetch(`/${page}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password, password2 }),
        credentials: "include",
      });

      if (response.ok) {
        const clientResponse = await response.json();

        if (clientResponse.user_name) {
          console.log(clientResponse.user_name);

          history.push({
            pathname: "/user/profile",
            state: { user: clientResponse.user_name },
          });
        } else {
          if (clientResponse.error.length > 0) {
            //show user validation errors
            SetShowUserMsgs(clientResponse.error);
          } else {
            // response good and no user, or network error so go to login page and show welcome message
            history.push("/login", {
              msg: clientResponse.success,
            });
          }
        }
      } else {
        //some front end error response is not a 200
        const clientResponse = await response.json();
        console.log(clientResponse);
        SetShowUserMsgs(clientResponse.error);
      }
    } catch (e) {
      //show User Error(e) network error
      console.log(e);
    }
  };

  return (
    <>
      <UserMessages showUserMsgs={locationState || showUserMsgs} />
      <div>
        <h1>{Title}</h1>
        <h1>Connect</h1>
        <h2>{UserMsg}</h2>
        <form onSubmit={formSubmitHandler}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Your Username"
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
            />
          </label>

          {page === "signup" ? (
            <label>
              Confirm Password:
              <input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Reenter Your Password"
              />
            </label>
          ) : (
            ""
          )}

          <button onClick={clearLocationState} type="submit">
            {button}
          </button>
        </form>

        {page === "signup" ? (
          <span>
            Already On Connect?<Link to="/login">Sign In</Link>
          </span>
        ) : (
          <span>
            New to Connect?<Link to="/">Join Now</Link>
          </span>
        )}
      </div>
    </>
  );
};

export default SignupLogin;
