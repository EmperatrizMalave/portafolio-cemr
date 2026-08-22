import { Facebook, Linkedin, Instagram } from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import personalInfoThumb from "../../assets/img/about/personal-infothumb.webp";

const socialContacts = [
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

const contactInfo = [
  {
    id: 1,
    system: "about.aboutMe.preferred",
    contact: "about.aboutMe.remote",
  },
  {
    id: 2,
    system: "about.aboutMe.address",
    contact: "about.aboutMe.location",
  },
  {
    id: 3,
    system: "about.aboutMe.followers",
    socalContact: socialContacts,
  },
];
const AboutMe = ({ isTabActive }) => {
  const { t } = useTranslation();
  return (
    <div className={`tabitem ${isTabActive === "about" ? "active" : ""} `}>
      <div className="about__v1wrap">
        <div className="row g-4 align-items-lg-start align-items-center">
          <div className="col-lg-5">
            <div
              className="about__onethumb"
              data-aos="zoom-in"
              data-aos-duration="500"
            >
              <img src={personalInfoThumb} alt="img" className="personal-image"
              />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about__onecontent">
              <h2
                className="h2-head"
                data-aos="fade-up"
                data-aos-duration="500"
              >
                {t("about.aboutMe.title")}
              </h2>
              <p
                className="p-descrip"
                data-aos="fade-up"
                data-aos-duration="500"
              >
              {t("about.aboutMe.text")}
                </p>
              <div className="about__contactwrap">
                <div className="row g-4">
                  {contactInfo.map(({ id, contact, socalContact, system }) => {
                    return (
                      <div
                        key={id}
                        className="col-xxl-6 col-xl-6 col-lg-12 col-md-6"
                        data-aos="zoom-in"
                      >
                        <div className="abox">
                          <div className="about__contbox__item">
                            <span className="ptext fz-18 mb-20 d-block">
                              {t(system)}
                            </span>
                            {contact && <Link to={""}>{t(contact)}</Link>}
                            {socalContact && (
                              <ul className="d-flex align-items-center gap-2 gap-xl-4">
                                {socalContact.map(({ icon, href: sHref, id: sId }) => (
                                  <li key={sId}>
                                    <a href={sHref} target="_blank" rel="noopener noreferrer">
                                      {icon}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
