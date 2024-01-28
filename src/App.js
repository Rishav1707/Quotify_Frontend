import React, { Fragment, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SingleQuote from "./components/pages/SingleQuote";
import DeleteQuote from "./components/pages/DeleteQuote";
import AllQuotes from "./components/pages/AllQuotes";
import NewQuotes from "./components/pages/NewQuotes";
import EditQuote from "./components/pages/EditQuote";
import MainNav from "./components/mainNav/MainNav";
import MyQuotes from "./components/pages/MyQuotes";
import LogOut from "./components/pages/LogOut";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import axios from "axios";
import "./App.css";

const App = () => {
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const [isloggedIn, setIsLoggedIn] = useState(currentUser);

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (Date.now() > currentUser.time + 1000 * 60 * 60 * 24 * 7) {
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      return;
    }

    const autologin = async () => {
      try {
        const email = currentUser.email;
        const res = await axios.post(
          `${URL}/autoLogin`,
          { email },
          { withCredentials: true }
        );
        const data = res.data;
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      } catch (error) {
        console.log("Error", error);
      }
    };

    autologin();

    const checkUser = setTimeout(() => {
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
    }, 1000 * 60 * 60 * 24 * 7);

    return () => {
      clearTimeout(checkUser);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <Fragment>
      <MainNav isloggedIn={isloggedIn} currentUser={currentUser} />
      <main>
        <Routes>
          <Route path="/" element={<AllQuotes isloggedIn={isloggedIn} />} />
          <Route
            path="/myQuotes"
            element={
              isloggedIn ? (
                <MyQuotes isloggedIn={isloggedIn} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/new"
            element={isloggedIn ? <NewQuotes /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/logout"
            element={<LogOut setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/edit/:id"
            element={isloggedIn ? <EditQuote /> : <Navigate to="/login" />}
          />
          <Route
            path="/delete/:id"
            element={isloggedIn ? <DeleteQuote /> : <Navigate to="/login" />}
          />
          <Route
            path="/quote/:id"
            element={<SingleQuote isloggedIn={isloggedIn} />}
          />
        </Routes>
      </main>
    </Fragment>
  );
};

export default App;
