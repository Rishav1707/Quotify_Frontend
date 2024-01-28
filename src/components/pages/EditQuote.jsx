import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { Fragment, useRef, useState } from "react";
import styles from "./EditQuotes.module.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
import "./AllQuotes.css";

const EditQuote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const imgFromQuery = query.get("img");
  const author = query.get("author");
  const text = query.get("text");

  const [img, setImg] = useState(imgFromQuery);
  const authorRef = useRef(author);
  const textRef = useRef(text);

  let URL = process.env.REACT_APP_localHostURL;
  if (process.env.NODE_ENV === "production") {
    URL = process.env.REACT_APP_serverURL;
  }

  const handleEditQuote = async (e) => {
    e.preventDefault();
    Swal.fire({
      width: "400",
      title: "Do you want to save the changes?",
      showDenyButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      confirmButtonColor: "#2C60E0",
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const author = authorRef.current.value;
        const text = textRef.current.value;

        const editedQuote = new FormData();
        editedQuote.append("img", img);
        editedQuote.append("author", author);
        editedQuote.append("text", text);

        try {
          const res = await axios.patch(
            `${URL}/updateQuote/${id}`,
            editedQuote,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          toast.success(res.data);
          navigate("/myQuotes");
        } catch (error) {
          console.log("Something went wrong in editing quote", error);
        }
      } else if (result.isDenied) {
        toast.info("Changes are not saved");
        navigate("/myQuotes");
      }
    });
  };

  return (
    <Fragment>
      <div className={styles.editQuotesContainer}>
        <div className="animate__animated animate__fadeInUp future">
          <p className={styles.possible}>
            " The future belongs to those who believe in the beauty of their
            dreams "
          </p>
          <span className={styles.alice}>- Eleanor Roosevelt</span>
        </div>
        <div className={styles.editQuotesContainerForm}>
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
            Edit your quote
          </h1>
          <form onSubmit={handleEditQuote} className={styles.form}>
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
              <input
                ref={authorRef}
                type="text"
                id="author"
                placeholder="Author Name"
                defaultValue={author}
                required
              />
            </div>
            <div className={styles["form-control"]}>
              <label htmlFor="text">Quote</label>
              <textarea
                ref={textRef}
                id="text"
                rows="5"
                maxLength="200"
                placeholder="Write quote"
                defaultValue={text}
                required
              />
            </div>
            <button>Save</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditQuote;
