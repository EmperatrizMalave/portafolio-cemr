import { XLg, ChevronRight } from "react-bootstrap-icons";
import logo from "../../../assets/img/logo/logo.webp";
import { socialIcons } from "../../../Utlits/socilIcons";
import { Link } from "react-router-dom";

const Drawer = ({ isSidebarActive, setIsSidebarActive }) => {
  return (
    <div className={`subside__barmenu ${isSidebarActive ? "active" : ""}`}>
      <div
        onClick={() => setIsSidebarActive(false)}
        className="remove__click d-flex justify-content-center align-items-center"
      >
        <i>
          <XLg />
        </i>
      </div>
      <div className="sub__contact__wrapper d-grid">
        <Link to={""} className="side-logo">
          <img src={logo} className="logo-drawer" alt="img" />
          <p className="text-logo-drawer">Coromoto Malave</p>
        </Link>
        <p>
          QA Engineer y Frontend Developer con base en Contaduría Pública. Especialista en aseguramiento de calidad para sistemas administrativos y pedagógicos, auditoría UI/UX y creación de manuales de usuario.
        </p>
        <div className="sub__contact-left d-grid">
          <div className="sub__contac-item">
            <div className="content">
              <span className="address d-block"> address </span>
              <span className="textp"> Zapopan Guadalajara Jalisco </span>
            </div>
          </div>
        </div>
        <div className="sub__contact-right mb-80 position-relative">
          <ul className="social d-flex gap-3">
            {socialIcons.map(({ icon, id, href }) => (
              <li key={id}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <i>{icon}</i>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/contact"
          onClick={() => setIsSidebarActive(false)}
          className="d-flex justify-content-center fw-500 cmn--btn align-items-center gap-2"
        >
          <span>
            <i>
              <ChevronRight />
            </i>
          </span>
          <span className="get__text"> Let's Talk </span>
        </Link>
      </div>
    </div>
  );
};

export default Drawer;
