import { useNavigate } from "react-router-dom";
import styles from "./MainNav.module.css";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MainNav = (props) => {
  const { isloggedIn, currentUser } = props;
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    Swal.fire({
      width: "330",
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2C60E0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
      showClass: {
        popup: `
          animate__animated
          animate__bounceIn
          animate__fast
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__bounceOut
          animate__fast
        `,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/logout`);
        setIsProfileClicked(false);
      }
    });
  };

  const handlePersonClick = () => {
    setIsProfileClicked(!isProfileClicked);
  };

  return (
    <Fragment>
      <nav className={styles.MainNav}>
        <Link to="/" className={styles.logo}>
          <img width={40} height={40} src="/quote-48.png" alt="quote-logo" />
          <span>Quotify - Inspire, Motivate, Elevate</span>
        </Link>
        <div className={styles.AllQuotesButton}>
          <div>
            <Link to="/">
              <span className="material-symbols-outlined">all_inbox</span>
              <span>All</span>
            </Link>
          </div>
          <div>
            <Link to={isloggedIn ? "/myQuotes" : "/login"}>
              <span className="material-symbols-outlined">chat_bubble</span>
              <span>My</span>
            </Link>
          </div>
          <div>
            <Link to={isloggedIn ? "/new" : "/login"}>
              <span className="material-symbols-outlined">add</span>
              <span>Add</span>
            </Link>
          </div>
          {isloggedIn ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              <span className="material-symbols-outlined">person</span>
              {currentUser.name}
            </span>
          ) : (
            <div>
              <Link to="/login">
                <span className="material-symbols-outlined">login</span>
                <span>Login</span>
              </Link>
            </div>
          )}
          {isloggedIn && (
            <div>
              <button onClick={handleLogoutClick}>
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <nav className={styles.MobileNav}>
        <div className={styles.MobileNavButton}>
          <div>
            <Link to="/">
              <span className="material-symbols-outlined">all_inbox</span>
            </Link>
          </div>
          <div>
            <Link to={isloggedIn ? "/myQuotes" : "/login"}>
              <span className="material-symbols-outlined">chat_bubble</span>
            </Link>
          </div>
          <div>
            <Link to={isloggedIn ? "/new" : "/login"}>
              <span className="material-symbols-outlined">add</span>
            </Link>
          </div>
          {isloggedIn ? (
            <span
              onClick={handlePersonClick}
              className="material-symbols-outlined"
            >
              person
            </span>
          ) : (
            <div>
              <Link to="/login">
                <span className="material-symbols-outlined">login</span>
              </Link>
            </div>
          )}
          {isloggedIn && (
            <div
              className={isProfileClicked ? styles.clicked : styles.notClicked}
            >
              <span>👋 Hello, {currentUser.name}</span>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.2rem",
                }}
                onClick={handleLogoutClick}
              >
                <span className="material-symbols-outlined">logout</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default MainNav;
