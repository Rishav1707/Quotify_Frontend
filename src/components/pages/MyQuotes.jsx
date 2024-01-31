import LoadingSpinner from "../Spinner/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Quote from "../quote/Quote";
import axios from "axios";
import "./AllQuotes.css";

const MyQuotes = (props) => {
  const { isloggedIn, isloading, setIsLoading } = props;
  const [myQuotes, setmyQuotes] = useState([]);

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  useEffect(() => {
    const getAllQuotes = async () => {
      try {
        const response = await axios.get(`${URL}/myQuotes`, {
          withCredentials: true,
        });
        const data = await response.data;
        setmyQuotes(data);
        setIsLoading(false);
      } catch (e) {
        console.log("Something went wrong", e);
      }
    };
    getAllQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="animate__animated animate__fadeInUp">My Quotes</h1>
      {isloading ? (
        <div className="loadingSpinner">
          <LoadingSpinner />
          <p>Hold on, your quotes is on its way!</p>
        </div>
      ) : (
        <>
          {myQuotes.length === 0 ? (
            <div
              className="animate__animated animate__fadeInUp"
              style={{ textAlign: "center", margin: "6rem auto" }}
            >
              <p style={{ fontSize: "1.5rem" }}>
                Oops!! look's like you haven't added any quote yet,
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#265cdf",
                    fontWeight: "600",
                  }}
                  to="/new"
                >
                  {" "}
                  Add Now
                </Link>
              </p>
            </div>
          ) : (
            <ul className="animate__animated animate__fadeInUp myQuotesGrid">
              {myQuotes.map((quote) => {
                return (
                  <Quote
                    key={quote._id}
                    id={quote._id}
                    img={quote.img}
                    author={quote.author}
                    text={quote.text}
                    likeLength={quote.likes.length}
                    likeArray={quote.likes}
                    isloggedIn={isloggedIn}
                    showDD={true}
                    quotes={myQuotes}
                    setQuotes={setmyQuotes}
                  />
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default MyQuotes;
