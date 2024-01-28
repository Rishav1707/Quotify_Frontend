import SocialIcon from "../SocialMedia/SocialIcon";
import styles from "../quote/Quote.module.css";
import { toast } from "react-toastify";
import Modal from "react-modal";

Modal.setAppElement("#root");

const PopUp = (props) => {
  const { modalIsOpen, setIsOpen, quoteUrl } = props;

  const closeModal = () => {
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    toast.success("Link copied to clipboard");
    navigator.clipboard.writeText(quoteUrl);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Share Quote Modal"
      className={styles.Modal}
      overlayClassName={styles.Overlay}
    >
      <div className={styles.ShareCut}>
        <p style={{ fontWeight: "600" }}>Share</p>
        <button onClick={closeModal}>
          <span
            style={{
              color: "#3c4043",
              fontSize: "1.7rem",
              lineHeight: "1.2",
            }}
            class="material-symbols-outlined"
          >
            close
          </span>
        </button>
      </div>
      <SocialIcon
        shareUrl={quoteUrl}
        title="Quotify - Inspire, Motivate, Elevate"
      />
      <div className={styles.inputCopy}>
        <input value={quoteUrl} disabled />
        <button onClick={copyToClipboard}>
          <span
            style={{ color: "#3c4043", fontSize: "1.6rem" }}
            class="material-symbols-outlined"
          >
            content_copy
          </span>
        </button>
      </div>
    </Modal>
  );
};

export default PopUp;
