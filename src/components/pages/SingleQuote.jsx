import styles from "../quote/Quote.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Quote from "../quote/Quote";
import axios from "axios";
import LoadingSpinner from "../Spinner/LoadingSpinner";

const SingleQuote = (props) => {
  const { isloggedIn, isloading, setIsLoading } = props;
  const { id } = useParams();
  const [singleQuote, setsingleQuote] = useState([]);

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  useEffect(() => {
    const handleSingleQuote = async () => {
      try {
        const res = await axios.get(`${URL}/quote/${id}`);
        const data = await res.data;
        setsingleQuote([data]);
        setIsLoading(false);
      } catch (e) {
        console.log("Something went wrong while deleting quote", e);
      }
    };
    handleSingleQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {isloading ? (
        <div className="loadingSpinner">
          <LoadingSpinner />
          <p>Hold on, your quotes is on its way!</p>
        </div>
      ) : (
        <div className={styles.singleQuote}>
          <div className={styles.single}>
            {singleQuote.map((quote) => {
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
                  quotes={singleQuote}
                  setQuotes={setsingleQuote}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleQuote;
