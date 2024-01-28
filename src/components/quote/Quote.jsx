import { Link, useNavigate } from "react-router-dom";
import styles from "./Quote.module.css";
import PopUp from "../SharePopUp/PopUp";
import { toast } from "react-toastify";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const Quote = (props) => {
  const {
    id,
    img,
    author,
    text,
    likeLength,
    likeArray,
    isloggedIn,
    showDD,
    quotes,
    setQuotes,
  } = props;

  const [modalIsOpen, setIsOpen] = useState(false);
  const quoteUrl = `${window.location.origin}/quote/${id}`;

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  const handleLikeClick = async () => {
    const quoteId = { id };
    try {
      const res = await axios.put(`${URL}/likeQuote`, quoteId, {
        withCredentials: true,
      });
      const data = await res.data;
      const likeUpdated = quotes.map((quote) => {
        if (quote._id === id) {
          return data.quote;
        } else {
          return quote;
        }
      });
      setQuotes(likeUpdated);
    } catch (error) {
      console.log("Something went wrong while liking quote", error);
    }
  };

  const handleunLikeClick = async () => {
    const quoteId = { id };
    try {
      const res = await axios.put(`${URL}/unlikeQuote`, quoteId, {
        withCredentials: true,
      });
      const data = await res.data;
      const likeUpdated = quotes.map((quote) => {
        if (quote._id === id) {
          return data.quote;
        } else {
          return quote;
        }
      });
      setQuotes(likeUpdated);
    } catch (error) {
      console.log("Something went wrong while unliking quote", error);
    }
  };

  const handleDeleteClick = () => {
    Swal.fire({
      width: "330",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2C60E0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
        toast.success("Your quote has been deleted.");
        navigate(`/delete/${id}`);
      }
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleNavigate = () => {
    toast.info("Please login first");
    navigate("/login");
  };

  return (
    <li className={styles.list}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src={`${URL}/profile_images/${img}`}
            alt="Quote-Profile-Logo"
            loading="lazy"
          />
        </div>
        <p>{text}</p>
        <span className={styles.author}>{author}</span>
        <div className={styles.btn}>
          <div className={styles.likeContainer}>
            {isloggedIn && likeArray.includes(currentUser._id) ? (
              <button onClick={isloggedIn ? handleunLikeClick : handleNavigate}>
                <span
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    color: "#FF0000",
                  }}
                  className="material-symbols-outlined"
                >
                  favorite
                </span>
              </button>
            ) : (
              <button onClick={isloggedIn ? handleLikeClick : handleNavigate}>
                <span
                  style={{
                    fontVariationSettings: "'FILL' 0",
                    color: "#FF0000",
                  }}
                  className="material-symbols-outlined"
                >
                  favorite
                </span>
              </button>
            )}
            <span style={{ fontSize: "1.5rem", marginTop: "1.5px" }}>
              {likeLength !== 0 && likeLength}
            </span>
          </div>
          <button onClick={isloggedIn ? openModal : handleNavigate}>
            <span
              style={{ color: "#2C60E0" }}
              className="material-symbols-outlined"
            >
              share
            </span>
          </button>
          <PopUp
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            quoteUrl={quoteUrl}
          />
          {showDD && (
            <>
              <Link
                to={
                  isloggedIn
                    ? `/edit/${id}?img=${img}&author=${author}&text=${text}`
                    : "/login"
                }
              >
                <span
                  style={{ color: "#000" }}
                  className="material-symbols-outlined"
                >
                  edit
                </span>
              </Link>
              <button onClick={isloggedIn ? handleDeleteClick : handleNavigate}>
                <span
                  style={{ color: "#FF0000" }}
                  className="material-symbols-outlined"
                >
                  delete
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default Quote;
