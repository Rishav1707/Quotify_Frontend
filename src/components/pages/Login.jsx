import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useRef } from "react";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import "./AllQuotes.css";

const Login = (props) => {
  const { setIsLoggedIn } = props;
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  const handleExistingUser = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const existingUser = { email, password };
    try {
      const res = await axios.post(`${URL}/loginUser`, existingUser, {
        withCredentials: true,
      });
      const data = await res.data;
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      setIsLoggedIn(true);
      toast.success(`Welcome back, ${data.user.name}`);
      navigate("/");
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  return (
    <Fragment>
      <div className={styles.loginContainer}>
        <div className="animate__animated animate__fadeInUp love">
          <p className={styles.love}>
            "The only way to do great work is to love what you do"
          </p>
          <span className={styles.steve}>- Steve Jobs</span>
        </div>
        <div className={styles.loginContainerForm}>
          <div
            className="animate__animated animate__fadeInUp"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            <img width={65} height={65} src="/quote-96.png" alt="quote-logo" />
          </div>
          <h1
            className="animate__animated animate__fadeInUp"
            style={{ fontSize: "1.8rem" }}
          >
            Sign in to your account
          </h1>
          <form onSubmit={handleExistingUser} className={styles.form}>
            <div className={styles["form-control"]}>
              <label htmlFor="email">Email address</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                required
                autoComplete="email"
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="password">Password</label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                required
                autoComplete="current-password"
              />
            </div>
            <button>Login</button>
            <p>
              Don't have an account,{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#265cdf",
                  fontWeight: "600",
                }}
                to="/signup"
              >
                Create a account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
