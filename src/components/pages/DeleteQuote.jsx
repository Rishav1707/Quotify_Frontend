import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const DeleteQuote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  useEffect(() => {
    const handleDeleteQuote = async () => {
      try {
        await axios.delete(`${URL}/deleteQuote/${id}`, {
          withCredentials: true,
        });
        navigate("/myQuotes");
      } catch (error) {
        console.log("Something went wrong while deleting quote", error);
      }
    };
    handleDeleteQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return null;
};

export default DeleteQuote;
