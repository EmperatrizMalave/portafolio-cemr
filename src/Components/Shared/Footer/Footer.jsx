import { ArrowUpShort, Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import avatar from "../../../assets/img/banner/banner-man.png";

const LINKEDIN_URL = "https://www.linkedin.com/in/coromoto-malave-rengel/";
const INSTAGRAM_URL = "https://www.instagram.com/cemrtechspace/";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61593324203754";

const contactButtons = [
  {
    id: 1,
    label: "LinkedIn",
    icon: <Linkedin />,
    href: LINKEDIN_URL,
    target: "_blank",
  },
  {
    id: 2,
    label: "Instagram",
    icon: <Instagram />,
    href: INSTAGRAM_URL,
    target: "_blank",
  },
  {
    id: 3,
    label: "Facebook",
    icon: <Facebook />,
    href: FACEBOOK_URL,
    target: "_blank",
  },
];

const Footer = () => {
  return (
    <footer className="footer__section">
      <div className="container">
        <div className="footer__top pt-120 pb-120">
          <div className="fl">Ponte en contacto</div>
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-lg-6">
              <div className="footer__profile">
                <div className="footer__profile-img">
                  <img src={avatar} alt="Cori Malavé" />
                </div>
                <div className="footer__profile-body">
                  <h3>Profile</h3>
                  <p>
                    QA Engineer y Frontend Developer con base en Contaduría
                    Pública. Especialista en aseguramiento de calidad para
                    sistemas administrativos y pedagógicos, auditoría UI/UX y
                    creación de manuales de usuario.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer__list">
                {contactButtons.map(({ id, label, icon, href, target }) => (
                  <a
                    key={id}
                    href={href}
                    className="footer__button"
                    target={target}
                    rel={target ? "noopener noreferrer" : undefined}
                  >
                    <span className="footer__arrow">&rarr;</span>
                    <span className="footer__icon">{icon}</span>
                    <span className="footer__label">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom cmn__bg">
        <div className="container">
          <div className="copyright">
            <p className="fisrtp">
              Copyright © 2025{" "}
              <Link to={"/"} className="inici">
                CEMR.
              </Link>{" "}
              Sitio web creado con fines personales
            </p>
            <ul className="terms">
              <li>
                <a href="#0"> Terms & Condition </a>
              </li>
              <li>
                <a href="#0"> Privacy Policy </a>
              </li>
            </ul>
            <a href="#about" className="toparrow">
              <i>
                <ArrowUpShort />
              </i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
