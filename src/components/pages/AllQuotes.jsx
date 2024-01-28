import React, { useEffect, useState } from "react";
import Quote from "../quote/Quote";
import axios from "axios";
import "./AllQuotes.css";

const AllQuotes = (props) => {
  const { isloggedIn } = props;
  const [quotes, setQuotes] = useState([]);
  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  useEffect(() => {
    const getAllQuotes = async () => {
      try {
        const response = await axios.get(`${URL}/quotes`);
        const data = await response.data;
        setQuotes(data);
      } catch (e) {
        console.log("Something went wrong", e);
      }
    };
    getAllQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="allQuotes">
      <h1 className="animate__animated animate__fadeInUp">
        Your Daily Dose of Inspiration!
      </h1>
      <ul className="animate__animated animate__fadeInUp allQuotesGrid">
        {quotes.map((quote) => {
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
              showDD={false}
              quotes={quotes}
              setQuotes={setQuotes}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default AllQuotes;
