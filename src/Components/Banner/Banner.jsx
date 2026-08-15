import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Facebook,
  Linkedin,
  Instagram,
  PlayFill,
} from "react-bootstrap-icons";

import bannerMan from "../../assets/img/banner/banner-man.png";
import scrollDown from "../../assets/img/banner/scroll-down.png";
import VideoPlay from "../Shared/VideoPlay/VideoPlay";

const socalIcon = [
  {
    id: 1,
    icon: <Facebook />,
    href: "https://www.facebook.com/profile.php?id=61593324203754",
  },
  {
    id: 2,
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/coromoto-malave-rengel/",
  },
  {
    id: 3,
    icon: <Instagram />,
    href: "https://www.instagram.com/cemrtechspace/",
  },
];
const Banner = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  return (
    <section id="home">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="banner__content">
              <h1>
                <span className="hone">QA Engineer</span>
                <span className="d-block profile-heading" data-text="Doc & QA Testing">
                Doc & QA Testing
                </span>
              </h1>
              <div className="video__area">
                <div onClick={openLightbox} className="video__80 video-btn">
                  <i>
                    <PlayFill color="#000" />
                  </i>
                </div>
                <span className="proces">Work Process</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="banner__thumb right_up_animat">
              <img src={bannerMan} alt="man-img" />
            </div>
          </div>
        </div>
      </div>
      <div className="banner__leftinfo">
        <div className="right__infoscroll">
          <Link className="scroll">
            scroll down
          </Link>
          <Link className="scroll__bar">
            <img src={scrollDown} alt="img" />
          </Link>
        </div>
      </div>
      <div className="banner__rightinfo">
        <div className="right__infoscroll">
          <Link to={""} className="scroll">
            Follow Me
          </Link>
          <Link to={""} className="scroll__bar">
            <img src={scrollDown} alt="img" />
          </Link>
        </div>
        <div className="banner__xlsocial">
          <ul className="banner__soci d-grid justify-content-center">
            {socalIcon.map(({ icon, id, href }) => {
              return (
                <li key={id}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <i>{icon}</i>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {lightboxOpen && (
        <VideoPlay
          setLightboxOpen={setLightboxOpen}
          url="https://www.youtube.com/embed/tgbNymZ7vqY"
        />
      )}
    </section>
  );
};

export default Banner;
