import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  LinkedinShareButton,
  FacebookIcon,
  XIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import "./Social.css";

const SocialIcon = (props) => {
  const { shareUrl, title } = props;
  return (
    <div className="Demo__container">
      <div className="Demo__some-network">
        <FacebookShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={50} round />
        </FacebookShareButton>
      </div>
      <div className="Demo__some-network">
        <TwitterShareButton
          title={title}
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <XIcon size={50} round />
        </TwitterShareButton>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          title={title}
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={50} round />
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={50} round />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          url={shareUrl}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={50} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default SocialIcon;
