import React, { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewQuotes.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import "./AllQuotes.css";

const NewQuotes = () => {
  const navigate = useNavigate();

  const [img, setImg] = useState(null);
  const authorRef = useRef();
  const textRef = useRef();

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  const handleNewQuote = async (e) => {
    e.preventDefault();

    const author = authorRef.current.value;
    const text = textRef.current.value;

    const quote = new FormData();
    quote.append("img", img);
    quote.append("author", author);
    quote.append("text", text);

    try {
      const res = await axios.post(`${URL}/newQuote`, quote, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data);
      navigate("/");
    } catch (e) {
      console.log("Error in handling new quote", e);
    }
  };

  return (
    <Fragment>
      <div className={styles.NewQuotesContainer}>
        <div className="animate__animated animate__fadeInUp impossible">
          <p className={styles.possible}>
            " The only way to achieve the impossible is to believe it is
            possible "
          </p>
          <span className={styles.alice}>- Alice in Wonderland</span>
        </div>
        <div className={styles.NewQuotesContainerForm}>
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
            Add a new quote
          </h1>
          <form onSubmit={handleNewQuote} className={styles.form}>
            <div className={styles["form-control"]}>
              <label htmlFor="img">Img</label>
              <input
                type="file"
                id="img"
                accept="image/jpg, image/jpeg, image/png,"
                onChange={(e) => setImg(e.target.files[0])}
                required
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="author">Author</label>
              <input ref={authorRef} type="text" id="author" required />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="text">Quote</label>
              <textarea
                ref={textRef}
                id="text"
                rows="10"
                maxLength="200"
                required
              />
            </div>
            <button>Add Quote</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewQuotes;
