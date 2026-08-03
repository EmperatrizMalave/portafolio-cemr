import { XLg } from "react-bootstrap-icons";

const VideoPlay = ({ setLightboxOpen, url }) => {
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  return (
    <div className="lightbox">
      <div className="lightbox__content lightbox__content-video">
        <button className="close_button" onClick={closeLightbox}>
          <i>
            <XLg />
          </i>
        </button>
        <iframe
          src={url}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlay;
