import { Link, useNavigate } from "react-router-dom";
import React, { Fragment, useRef } from "react";
import styles from "./SignUp.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import "./AllQuotes.css";

const SignUp = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  const handleNewUser = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const newUser = { name, email, password };
    try {
      const res = await axios.post(`${URL}/registerUser`, newUser);
      console.log(res);
      toast.success(res.data);
      navigate("/login");
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  return (
    <Fragment>
      <div className={styles.SignUpContainer}>
        <div className="animate__animated animate__fadeInUp predict">
          <p className={styles.predict}>
            " The best way to predict the future is to create it "
          </p>
          <span className={styles.peter}>- Peter Drucker</span>
        </div>
        <div className={styles.SignUpContainerForm}>
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
            Sign up for your account
          </h1>
          <form onSubmit={handleNewUser} className={styles.form}>
            <div className={styles["form-control"]}>
              <label htmlFor="name">Name</label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                required
                autoComplete="name"
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="email">Email</label>
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
                autoComplete="new-password"
              />
            </div>
            <button>Sign up</button>
            <p>
              Already have an account,{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "#265cdf",
                  fontWeight: "600",
                }}
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
